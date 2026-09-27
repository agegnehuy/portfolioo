import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { AlertTriangle, CheckCircle2, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";

const configs = {
  services: { title: "Services", description: "Manage capability pages and publication status.", fields: [["title","Title","text"],["slug","Slug","text"],["summary","Summary","textarea"],["audience","Who it helps","textarea"],["description","Full description","textarea"],["deliverables","Deliverables, one per line","list"],["technologies","Technologies, one per line","list"],["order_index","Order","number"],["is_published","Published","checkbox"]] },
  articles: { title: "Articles", description: "Create, preview, and publish original insights.", fields: [["title","Title","text"],["slug","Unique slug","text"],["excerpt","Excerpt","textarea"],["category","Category","text"],["tags","Tags, one per line","list"],["cover_image","Cover image URL","text"],["author","Author","text"],["reading_time","Reading time","number"],["body_text","Article body","textarea"],["published_at","Publish date","date"],["is_featured","Featured","checkbox"],["is_published","Published","checkbox"]] },
  testimonials: { title: "Testimonials", description: "Review submissions before they can appear publicly.", fields: [["name","Name","text"],["role","Role","text"],["organization","Organization","text"],["quote","Quote","textarea"],["photo_url","Photo URL","text"],["is_approved","Approved","checkbox"]] },
};

const blankFor = (fields) => Object.fromEntries(fields.map(([key,,type]) => [key, type === "checkbox" ? false : type === "number" ? 0 : ""]));

export function ContentManager({ table }) {
  const config = configs[table];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankFor(config.fields));
  const [status, setStatus] = useState({ loading: true, error: "", saving: false });
  const load = async () => {
    setStatus((s) => ({ ...s, loading: true, error: "" }));
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    setItems(data || []); setStatus((s) => ({ ...s, loading: false, error: error?.message || "" }));
  };
  // load is intentionally rerun only when the selected content table changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [table]);
  const open = (item = null) => {
    setEditing(item || "new");
    setForm(item ? Object.fromEntries(config.fields.map(([key,,type]) => [key, type === "list" ? (Array.isArray(item[key]) ? item[key] : []).join("\n") : item[key] ?? (type === "checkbox" ? false : "")])) : blankFor(config.fields));
  };
  const save = async (event) => {
    event.preventDefault(); setStatus((s) => ({ ...s, saving: true, error: "" }));
    const payload = Object.fromEntries(config.fields.map(([key,,type]) => [key, type === "list" ? String(form[key] || "").split("\n").map((v) => v.trim()).filter(Boolean) : type === "number" ? Number(form[key]) : form[key]]));
    if (table === "articles") payload.body = payload.body_text ? payload.body_text.split("\n\n").map((text, i) => ({ heading: i === 0 ? "Overview" : `Section ${i + 1}`, text })) : [];
    const query = editing === "new" ? supabase.from(table).insert(payload) : supabase.from(table).update(payload).eq("id", editing.id);
    const { error } = await query; setStatus((s) => ({ ...s, saving: false, error: error?.message || "" }));
    if (!error) { setEditing(null); load(); }
  };
  const remove = async (id) => { if (!window.confirm("Delete this item?")) return; const { error } = await supabase.from(table).delete().eq("id", id); if (error) setStatus((s) => ({ ...s, error: error.message })); else load(); };
  return <section className="space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-bold">{config.title}</h1><p className="text-sm text-slate-400 mt-1">{config.description}</p></div><button onClick={() => open()} className="min-h-11 px-4 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 inline-flex items-center gap-2"><Plus className="w-4 h-4"/>New item</button></header>
    {status.error && <div role="alert" className="p-4 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200"><p>{status.error}</p>{status.error.includes("schema cache") && <p className="mt-2 text-sm text-red-100/80">Run <code className="rounded bg-black/20 px-1.5 py-0.5">20260927_fix_dashboard_content.sql</code> in the Supabase SQL Editor, then refresh this page.</p>}</div>}
    {status.loading ? <p className="text-slate-400">Loading…</p> : items.length === 0 ? <p className="p-10 text-center rounded-2xl border border-white/10 text-slate-500">No items yet.</p> : <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{items.map((item) => <article key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/10"><h2 className="font-semibold">{item.title || item.name || item.key}</h2><p className="text-sm text-slate-400 line-clamp-3 mt-2">{item.summary || item.excerpt || item.quote || item.value}</p><div className="flex gap-2 mt-5"><button onClick={() => open(item)} className="min-h-10 px-3 rounded-lg border border-indigo-400/30 text-indigo-300 inline-flex items-center gap-2"><Pencil className="w-4 h-4"/>Edit</button><button onClick={() => remove(item.id)} className="min-h-10 px-3 rounded-lg border border-red-400/30 text-red-300 inline-flex items-center gap-2"><Trash2 className="w-4 h-4"/>Delete</button></div></article>)}</div>}
    {editing && <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"><form onSubmit={save} className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-[#0a0a1a] border border-white/15 p-6 space-y-4"><div className="flex justify-between"><h2 className="text-xl font-semibold">{editing === "new" ? "New" : "Edit"} item</h2><button type="button" onClick={() => setEditing(null)} aria-label="Close"><X/></button></div>{config.fields.map(([key,label,type]) => <label key={key} className="block text-sm text-slate-300">{type === "checkbox" ? <span className="flex items-center gap-3"><input type="checkbox" checked={Boolean(form[key])} onChange={(e) => setForm((f) => ({...f,[key]:e.target.checked}))}/>{label}</span> : <>{label}{type === "textarea" || type === "list" ? <textarea rows={type === "list" ? 4 : 5} value={form[key] || ""} onChange={(e) => setForm((f) => ({...f,[key]:e.target.value}))} className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:border-indigo-400"/> : <input type={type} value={form[key] || ""} onChange={(e) => setForm((f) => ({...f,[key]:e.target.value}))} className="mt-1 w-full min-h-11 rounded-xl bg-white/5 border border-white/10 px-3 outline-none focus:border-indigo-400"/>}</>}</label>)}<button disabled={status.saving} className="min-h-11 px-5 rounded-xl bg-indigo-500 inline-flex items-center gap-2"><Save className="w-4 h-4"/>{status.saving ? "Saving…" : "Save"}</button></form></div>}
  </section>;
}

ContentManager.propTypes = { table: PropTypes.oneOf(["services", "articles", "testimonials"]).isRequired };

const ABOUT_FIELDS = [
  {
    key: "about_bio",
    label: "Biography",
    hint: "The main introduction shown on your About page.",
    rows: 6,
    fallback: "I am a software developer and digital systems specialist passionate about building practical, user-focused solutions. I enjoy working across front-end development, back-end development, and DevOps while continuously learning and exploring new technologies.",
  },
  {
    key: "about_quote",
    label: "Personal quote",
    hint: "A short statement that summarizes what motivates your work.",
    rows: 3,
    fallback: "Using technology to create opportunities and positively impact others.",
  },
];

const ABOUT_DEFAULTS = Object.fromEntries(ABOUT_FIELDS.map((field) => [field.key, field.fallback]));

export function AboutContentManager() {
  const [form, setForm] = useState(ABOUT_DEFAULTS);
  const [status, setStatus] = useState({ loading: true, saving: false, error: "", success: "", missingTable: false });

  const load = async () => {
    setStatus({ loading: true, saving: false, error: "", success: "", missingTable: false });
    const { data, error } = await supabase.from("site_content").select("key,value").in("key", ABOUT_FIELDS.map((field) => field.key));
    if (error) {
      setStatus({ loading: false, saving: false, error: error.message, success: "", missingTable: error.code === "PGRST205" });
      return;
    }
    setForm({ ...ABOUT_DEFAULTS, ...Object.fromEntries((data || []).map((item) => [item.key, item.value || ""])) });
    setStatus({ loading: false, saving: false, error: "", success: "", missingTable: false });
  };

  useEffect(() => { load(); }, []);

  const save = async (event) => {
    event.preventDefault();
    setStatus((current) => ({ ...current, saving: true, error: "", success: "" }));
    const rows = ABOUT_FIELDS.map((field) => ({ key: field.key, value: form[field.key].trim() }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    if (error) {
      setStatus((current) => ({ ...current, saving: false, error: error.message, missingTable: error.code === "PGRST205" }));
      return;
    }
    setStatus((current) => ({ ...current, saving: false, success: "About page content saved successfully." }));
  };

  return <section className="max-w-4xl space-y-6">
    <header>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">Website content</p>
      <h1 className="mt-2 text-3xl font-bold">About page</h1>
      <p className="mt-2 max-w-2xl text-slate-400">Update the words visitors see on your About page. Changes are saved directly to your website.</p>
    </header>

    {status.missingTable && <div role="alert" className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 text-amber-100">
      <div className="flex gap-3"><AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"/><div><h2 className="font-semibold">One database setup step is required</h2><p className="mt-2 text-sm leading-6 text-amber-100/80">In Supabase, open <strong>SQL Editor</strong>, run <code className="rounded bg-black/20 px-1.5 py-0.5">20260927_fix_site_content.sql</code>, then return here and select Try again.</p></div></div>
      <button type="button" onClick={load} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-300/30 px-4 font-semibold transition-colors hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><RefreshCw aria-hidden="true" className="h-4 w-4"/>Try again</button>
    </div>}

    {status.error && !status.missingTable && <div role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200"><p>{status.error}</p><button type="button" onClick={load} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-300/30 px-4 font-semibold"><RefreshCw aria-hidden="true" className="h-4 w-4"/>Try again</button></div>}
    {status.success && <p role="status" className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-emerald-200"><CheckCircle2 aria-hidden="true" className="h-5 w-5"/>{status.success}</p>}

    <form onSubmit={save} className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      {ABOUT_FIELDS.map((field) => <label key={field.key} className="block">
        <span className="font-semibold text-white">{field.label}</span>
        <span className="mt-1 block text-sm text-slate-400">{field.hint}</span>
        <textarea required rows={field.rows} disabled={status.loading || status.saving || status.missingTable} value={form[field.key]} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-white/5 p-4 leading-7 text-white outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 disabled:cursor-not-allowed disabled:opacity-50"/>
      </label>)}
      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
        <button disabled={status.loading || status.saving || status.missingTable} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-500 px-5 font-semibold transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"><Save aria-hidden="true" className="h-4 w-4"/>{status.saving ? "Saving…" : "Save changes"}</button>
        <p className="text-sm text-slate-400">{status.loading ? "Loading your current content…" : "Your public About page updates after saving."}</p>
      </div>
    </form>
  </section>;
}
