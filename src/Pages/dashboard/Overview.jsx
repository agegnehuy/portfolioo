import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { FolderGit2, BriefcaseBusiness, Newspaper, Quote } from "lucide-react";

const metrics = [
  ["projects", "Projects", FolderGit2], ["services", "Services", BriefcaseBusiness], ["articles", "Articles", Newspaper], ["testimonials", "Testimonials", Quote],
];

export default function Overview() {
  const [counts, setCounts] = useState({}); const [error, setError] = useState("");
  useEffect(() => { Promise.all(metrics.map(([table]) => supabase.from(table).select("id", { count: "exact", head: true }))).then((results) => { setCounts(Object.fromEntries(results.map((result, index) => [metrics[index][0], result.count || 0]))); const failure = results.find((result) => result.error); if (failure) setError("Some new content tables are unavailable. Apply the supplied Supabase migration."); }); }, []);
  return <section className="space-y-7"><header><p className="text-sm text-indigo-300 uppercase tracking-widest">Overview</p><h1 className="text-3xl font-bold mt-2">Portfolio dashboard</h1><p className="text-slate-400 mt-2">Published content and audience activity at a glance.</p></header>{error && <p className="rounded-xl border border-amber-400/25 bg-amber-500/10 p-4 text-amber-200">{error}</p>}<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{metrics.map(([key,label,Icon]) => <article key={key} className="rounded-2xl border border-white/10 bg-white/5 p-5"><Icon className="w-5 h-5 text-indigo-400"/><p className="text-3xl font-bold mt-5">{counts[key] ?? "—"}</p><p className="text-sm text-slate-400 mt-1">{label}</p></article>)}</div><div className="rounded-2xl border border-white/10 bg-white/5 p-6"><h2 className="text-xl font-semibold">Before publishing</h2><ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-slate-400"><li>Confirm every case study states your exact role and outcomes.</li><li>Approve testimonials only when publication permission is recorded.</li><li>Preview article metadata and links.</li><li>Test contact and project routes in a fresh browser.</li></ul></div></section>;
}
