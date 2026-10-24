// ============================================================
// api.js — Capa de datos de la app pública (Escritorio Público)
// Solo LECTURA + acceso de perfiles. Todo lo que escribe vive en el CRM.
// Se carga desde app.js con import("./api.js").
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.117.1";

const SUPABASE_URL = "https://ypudvitlqobnfpqdrbby.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_2dwNHlj0GpRZcoO6LSwcAg_oEYvoA0b";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Las columnas que no son "conocidas" viajan dentro de "extra"; aquí se mezclan de vuelta en la fila.
function mergeExtra(row) {
  if (!row) return row;
  const { extra, ...rest } = row;
  return { ...rest, ...(extra || {}) };
}
const mergeExtraList = (rows) => (rows || []).map(mergeExtra);

async function readAll(table, fn) {
  const { data, error } = await fn(supabase.from(table).select("*"));
  if (error) throw error;
  return mergeExtraList(data);
}
const byOrder = (q) => q.order("sort_order");

// ---------------- Catálogo ----------------
export const StreamingAPI = { list: () => readAll("streaming", byOrder) };
export const StreamCatsAPI = { list: () => readAll("stream_cats", byOrder) };
export const InformaticaAPI = { list: () => readAll("informatica", byOrder) };
export const AccesosAPI = { list: () => readAll("accesos", byOrder) };

// Secciones + items (Trámites y Documentos/Personalizados usan las mismas reglas).
// listAll trae TODOS los items en una sola petición; listBySeccion queda como respaldo.
function seccionesAPI(table) {
  return { list: () => readAll(table, byOrder) };
}
function itemsAPI(table) {
  return {
    listAll: () => readAll(table, byOrder),
    listBySeccion: (seccionId) => readAll(table, (q) => byOrder(q.eq("seccion_id", seccionId))),
  };
}
export const SeccionesAPI = seccionesAPI("tramites_secciones");
export const ServicioItemsAPI = itemsAPI("tramites_items");
export const DocSeccionesAPI = seccionesAPI("documentos_secciones");
export const DocItemsAPI = itemsAPI("documentos_items");

// ---------------- Config (fila única) ----------------
export const ConfigAPI = {
  async get() {
    const { data, error } = await supabase.from("config").select("*").eq("id", 1).single();
    if (error) throw error;
    return data;
  },
};

// ---------------- Tiempo real (Supabase Realtime) ----------------
// Avisa cuando el CRM cambia algo del catálogo. SOLO tablas de lectura pública.
// perfiles_publicos NO va aquí: Realtime envía la fila completa (hashes, correo…) a quien se suscribe.
// onChange(grupo) recibe: "streaming" | "servicios" | "docs" | "informatica" | "accesos" | "config"
// onStatus(estado) recibe: SUBSCRIBED | CHANNEL_ERROR | TIMED_OUT | CLOSED
const REALTIME_TABLAS = {
  streaming: "streaming",
  stream_cats: "streaming",
  tramites_secciones: "servicios",
  tramites_items: "servicios",
  documentos_secciones: "docs",
  documentos_items: "docs",
  informatica: "informatica",
  accesos: "accesos",
  config: "config",
};
export function subscribeCatalog(onChange, onStatus) {
  let canal = supabase.channel("catalogo-publico");
  Object.keys(REALTIME_TABLAS).forEach((tabla) => {
    canal = canal.on("postgres_changes", { event: "*", schema: "public", table: tabla }, () => {
      try { onChange && onChange(REALTIME_TABLAS[tabla], tabla); } catch (e) { console.warn("Realtime: error en onChange", e); }
    });
  });
  canal.subscribe((estado) => {
    try { onStatus && onStatus(estado); } catch (e) { console.warn("Realtime: error en onStatus", e); }
  });
  return () => supabase.removeChannel(canal);
}

// ---------------- Perfiles públicos ----------------
// Solo columnas que puede ver un visitante. NUNCA se piden hashes ni contraseñas.
export const ProfilesAPI = {
  async listPublic() {
    let r = await supabase.from("perfiles_publicos").select("id,name,username,emoji,strong_auth,role,prefs,created_at").order("created_at");
    if (r.error) r = await supabase.from("perfiles_publicos").select("id,name,username,emoji,role,created_at").order("created_at");
    if (r.error) throw r.error;
    return r.data;
  },
};

// ---------------- Acceso seguro de perfiles ----------------
// La contraseña se comprueba en el servidor (bcrypt); el navegador nunca recibe hashes.
export const PerfilAuth = {
  // → { ok, id, must_change } | { ok:false, bloqueado?, segundos?, suspendido? }
  async login(ident, password) {
    const { data, error } = await supabase.rpc("perfil_login", { p_ident: ident, p_password: password });
    if (error) throw error;
    return data || { ok: false };
  },
  // → { ok:true } | { ok:false, error: credenciales|bloqueado|corta|larga|espacios|igual }
  async cambiar(ident, actual, nueva) {
    const { data, error } = await supabase.rpc("perfil_cambiar_password", { p_ident: ident, p_current: actual, p_new: nueva });
    if (error) throw error;
    return data || { ok: false };
  },
  // Pide una contraseña temporal por correo (la respuesta es siempre la misma, exista o no el usuario)
  async recuperar(identificador) {
    const r = await fetch(SUPABASE_URL + "/functions/v1/recuperar-password", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ identificador }),
      signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined,
    });
    if (!r.ok) throw new Error("recuperar " + r.status);
    return r.json();
  },
};
