import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, Clock3, Search, Sparkles } from "lucide-react";
import { supabase } from "../supabase";
import { defaultArticles, defaultServices, faqItems, processStages } from "../content/siteContent";

const shell = "min-h-screen bg-[#030014] text-white px-[5%] lg:px-[10%] pt-28 pb-20";
const card = "rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl";
const fixedArticleCovers = {
  "building-a-portfolio-as-a-working-system": "/insight-useful-website.webp",
  "what-i-learned-connecting-react-and-supabase": "/insight-digital-trust.webp",
};
const articleCover = (article) => fixedArticleCovers[article.slug] || article.cover_image;

function PageHeader({ eyebrow, title, description }) {
  return <header className="max-w-3xl mb-12">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300 mb-3">{eyebrow}</p>
    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">{title}</h1>
    <p className="mt-5 text-base md:text-lg leading-8 text-slate-400">{description}</p>
  </header>;
}

PageHeader.propTypes = { eyebrow: PropTypes.string.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string.isRequired };

function usePublished(table, fallback) {
  const [items, setItems] = useState(fallback);
  useEffect(() => {
    let active = true;
    supabase.from(table).select("*").eq("is_published", true).order("order_index", { ascending: true })
      .then(({ data, error }) => { if (active && !error && data?.length) setItems(data); });
    return () => { active = false; };
  }, [table, fallback]);
  return items;
}

export function ServicesPage() {
  const services = usePublished("services", defaultServices);
  return <main id="main-content" className={shell}>
    <Helmet><title>Services — Agegnehu Yelib Tesfa</title><meta name="description" content="Front-end, back-end, and DevOps capabilities offered by Agegnehu Yelib Tesfa." /></Helmet>
    <PageHeader eyebrow="Capabilities" title="Services built around useful outcomes" description="Clear deliverables, practical technology choices, and a direct path from an idea to a dependable digital service." />
    <div className="grid md:grid-cols-3 gap-6">{services.map((service) => <article key={service.id || service.slug} className={`${card} p-7 flex flex-col`}>
      <h2 className="text-2xl font-semibold">{service.title}</h2><p className="mt-3 text-slate-400 leading-7 flex-1">{service.summary}</p>
      <p className="mt-6 text-sm text-indigo-200">Best for: {service.audience}</p>
      <Link className="mt-6 min-h-11 inline-flex items-center gap-2 font-semibold text-purple-300 focus-visible:ring-2 focus-visible:ring-purple-400 rounded" to={`/services/${service.slug}`}>
        View service <ArrowRight className="w-4 h-4" />
      </Link>
    </article>)}</div>
  </main>;
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const services = usePublished("services", defaultServices);
  const service = services.find((item) => item.slug === slug);
  if (!service) return <main className={shell}><PageHeader eyebrow="Service" title="Service not found" description="This service may have moved or is not currently published." /><Link to="/services" className="text-purple-300">Back to services</Link></main>;
  const deliverables = Array.isArray(service.deliverables) ? service.deliverables : [];
  const technologies = Array.isArray(service.technologies) ? service.technologies : [];
  return <main id="main-content" className={shell}>
    <Helmet><title>{service.title} — Agegnehu Yelib Tesfa</title><meta name="description" content={service.summary} /></Helmet>
    <PageHeader eyebrow="Service detail" title={service.title} description={service.description || service.summary} />
    <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-8">
      <section className={`${card} p-7 md:p-9`}><h2 className="text-2xl font-semibold mb-5">What you receive</h2><ul className="space-y-4">{deliverables.map((item) => <li key={item} className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />{item}</li>)}</ul></section>
      <aside className={`${card} p-7 md:p-9`}><h2 className="text-2xl font-semibold mb-5">Technology</h2><div className="flex flex-wrap gap-2">{technologies.map((item) => <span key={item} className="px-3 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-sm text-indigo-200">{item}</span>)}</div>
        <Link to="/#Contact" className="mt-8 min-h-11 inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold">Discuss a project <ArrowRight className="w-4 h-4" /></Link>
      </aside>
    </div>
  </main>;
}

export function ProcessPage() {
  return <main id="main-content" className={shell}><Helmet><title>How I Work — Agegnehu Yelib Tesfa</title></Helmet>
    <PageHeader eyebrow="Process" title="A clear path from problem to launch" description="Each stage explains the work, the collaboration needed, and the outcome you can expect." />
    <ol className="space-y-5">{processStages.map(([name, happens, provides, receives], index) => <li key={name} className={`${card} p-6 md:p-8 grid md:grid-cols-[70px_1fr_1fr] gap-5`}>
      <span className="w-12 h-12 rounded-full bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center text-xl font-bold text-indigo-300">{index + 1}</span>
      <div><h2 className="text-xl font-semibold">{name}</h2><p className="mt-2 text-slate-400 leading-7">{happens}</p></div>
      <div className="text-sm leading-6"><p><strong className="text-purple-300">You provide:</strong> <span className="text-slate-400">{provides}</span></p><p className="mt-3"><strong className="text-purple-300">You receive:</strong> <span className="text-slate-400">{receives}</span></p></div>
    </li>)}</ol>
    <Link to="/#Contact" className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold">Start a conversation <ArrowRight className="w-4 h-4" /></Link>
  </main>;
}

export function InsightsPage() {
  const articles = usePublished("articles", defaultArticles);
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(articles.map((item) => item.category))];
  const filtered = useMemo(() => articles.filter((item) => (category === "All" || item.category === category) && `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase())), [articles, category, query]);
  return <main id="main-content" className={shell}><Helmet><title>Insights — Agegnehu Yelib Tesfa</title><meta name="description" content="Short, friendly stories about websites, problem-solving, and lessons learned while building useful digital products." /></Helmet>
    <PageHeader eyebrow="Insights, made simple" title="Big ideas. Simple words. Zero tech headaches." description="Short, friendly stories about websites, problem-solving, and surprising lessons I learned while building things. No robot dictionary required." />
    <div className="flex flex-col md:flex-row gap-4 mb-8"><label className="relative flex-1"><span className="sr-only">Search articles</span><Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500"/><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full min-h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400 outline-none" placeholder="Search articles" /></label>
      <div className="flex gap-2 flex-wrap" aria-label="Article categories">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`min-h-11 px-4 rounded-xl border ${category === item ? "bg-indigo-500/20 border-indigo-400 text-white" : "border-white/10 text-slate-400"}`}>{item}</button>)}</div></div>
    {filtered.length ? <div className="grid md:grid-cols-2 gap-6">{filtered.map((article) => <article key={article.id || article.slug} className={`${card} overflow-hidden group transition duration-200 hover:-translate-y-1 hover:border-indigo-400/30`}><img src={articleCover(article)} alt={`${article.title} cover illustration`} className="w-full h-52 object-cover" loading="lazy"/><div className="p-7"><div className="flex justify-between text-sm text-indigo-300"><span>{article.category}</span><span className="flex items-center gap-1"><Clock3 className="w-4 h-4"/>{article.reading_time} min, easy read</span></div><h2 className="text-2xl font-semibold mt-3">{article.title}</h2><p className="text-slate-300 leading-7 mt-3">{article.excerpt}</p><p className="text-xs text-slate-500 mt-4">A quick story by {article.author} · {new Date(article.published_at).toLocaleDateString()}</p><Link to={`/insights/${article.slug}`} className="mt-5 min-h-11 inline-flex items-center gap-2 text-purple-300 font-semibold rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">Tell me the story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/></Link></div></article>)}</div> : <p className={`${card} p-10 text-center text-slate-400`}>Nothing found. Try a simpler word—or explore everything.</p>}
  </main>;
}

export function ArticlePage() {
  const { slug } = useParams(); const articles = usePublished("articles", defaultArticles); const article = articles.find((item) => item.slug === slug);
  if (!article) return <main className={shell}><PageHeader eyebrow="Insights" title="Article not found" description="This article may have moved or is not currently published." /></main>;
  const body = Array.isArray(article.body) ? article.body : [];
  const coverImage = articleCover(article);
  return <main id="main-content" className={`${shell} max-w-5xl mx-auto`}><Helmet><title>{article.title} — Agegnehu Yelib Tesfa</title><meta name="description" content={article.excerpt}/><meta property="og:type" content="article"/><meta property="og:image" content={coverImage}/></Helmet>
    <PageHeader eyebrow={article.category} title={article.title} description={article.excerpt}/><div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-8"><span>A story by {article.author}</span><span>{new Date(article.published_at).toLocaleDateString()}</span><span>{article.reading_time} min, easy read</span></div><img src={coverImage} alt={`${article.title} cover illustration`} className="w-full max-h-[460px] object-cover rounded-3xl border border-white/10"/>
    <article className="max-w-3xl mx-auto mt-12 space-y-10">{body.map((section) => <section key={section.heading}><h2 className="text-2xl font-semibold">{section.heading}</h2><p className="mt-4 text-slate-300 leading-8">{section.text}</p></section>)}</article>
    <Link to="/insights" className="mt-12 min-h-11 inline-flex items-center text-purple-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">← More simple ideas</Link>
  </main>;
}

export function FAQPage() {
  return <main id="main-content" className={`${shell} max-w-5xl mx-auto`}><Helmet><title>FAQ — Agegnehu Yelib Tesfa</title></Helmet><PageHeader eyebrow="FAQ" title="Common questions" description="Practical information about services, collaboration, availability, and support."/><div className="space-y-4">{faqItems.map(([question, answer]) => <details key={question} className={`${card} group p-6`}><summary className="cursor-pointer font-semibold text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded">{question}</summary><p className="mt-4 text-slate-400 leading-7">{answer}</p></details>)}</div></main>;
}

function LegalPage({ type }) {
  const privacy = type === "privacy";
  return <main id="main-content" className={`${shell} max-w-5xl mx-auto`}><Helmet><title>{privacy ? "Privacy Policy" : "Terms of Use"} — Agegnehu Yelib Tesfa</title></Helmet><PageHeader eyebrow="Legal" title={privacy ? "Privacy Policy" : "Terms of Use"} description={`Last updated ${new Date().toLocaleDateString()}.`}/><div className={`${card} p-7 md:p-10 space-y-8 text-slate-300 leading-8`}>
    {privacy ? <><section><h2 className="text-xl font-semibold text-white">Information collected</h2><p>Contact submissions include the name, email address, and message you provide. Testimonial submissions may include your name, role, organization, feedback, and publication permission.</p></section><section><h2 className="text-xl font-semibold text-white">How information is used</h2><p>Information is used only to respond to enquiries, operate the portfolio, and review feedback before publication. Contact messages are processed by FormSubmit and delivered by email.</p></section><section><h2 className="text-xl font-semibold text-white">Your choices</h2><p>You may request correction or deletion of information you submitted by contacting agegnehuyelib01@gmail.com.</p></section></> : <><section><h2 className="text-xl font-semibold text-white">Purpose</h2><p>This site presents portfolio work, capabilities, and educational writing. Content may not be copied or represented as another person’s work without permission.</p></section><section><h2 className="text-xl font-semibold text-white">Accuracy and external links</h2><p>Reasonable care is taken to keep information accurate. External services and links have their own terms and availability.</p></section><section><h2 className="text-xl font-semibold text-white">Contact</h2><p>Questions about these terms may be sent to agegnehuyelib01@gmail.com.</p></section></>}
  </div></main>;
}
LegalPage.propTypes = { type: PropTypes.oneOf(["privacy", "terms"]).isRequired };
export const PrivacyPage = () => <LegalPage type="privacy"/>;
export const TermsPage = () => <LegalPage type="terms"/>;

export function HomeAdditions() {
  return <section className="px-[5%] lg:px-[10%] py-20 text-white" aria-labelledby="home-capabilities"><div className="text-center max-w-3xl mx-auto"><p className="text-indigo-300 uppercase tracking-[0.2em] text-sm">Explore</p><h2 id="home-capabilities" className="text-3xl md:text-5xl font-bold mt-3">More than a project gallery</h2><p className="text-slate-400 mt-4 leading-7">See how I work, what I can help build, and the lessons behind the implementation.</p></div><div className="grid md:grid-cols-3 gap-5 mt-10">{[["Services","Practical front-end, back-end, and DevOps capabilities.","/services"],["How I work","A transparent seven-stage delivery process.","/process"],["Insights","Original notes from building and learning.","/insights"]].map(([title,text,to]) => <Link key={to} to={to} className={`${card} p-6 group focus-visible:ring-2 focus-visible:ring-purple-400`}><Sparkles className="w-5 h-5 text-indigo-400"/><h3 className="text-xl font-semibold mt-4">{title}</h3><p className="text-slate-400 mt-2">{text}</p><span className="inline-flex items-center gap-2 text-purple-300 mt-5">Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition"/></span></Link>)}</div></section>;
}

export function TestimonialsSection() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", organization: "", quote: "", permission_confirmed: false });
  const [message, setMessage] = useState("");
  useEffect(() => { supabase.from("testimonials").select("*").eq("is_approved", true).order("created_at", { ascending: false }).then(({ data }) => setItems(data || [])); }, []);
  const submit = async (event) => { event.preventDefault(); setMessage("Submitting…"); const { error } = await supabase.from("testimonials").insert({ ...form, is_approved: false }); if (error) setMessage("Submission is not available yet. Please try again later."); else { setMessage("Thank you. Your testimonial will appear after review."); setForm({ name: "", role: "", organization: "", quote: "", permission_confirmed: false }); } };
  return <section className="px-[5%] lg:px-[10%] py-20 text-white" aria-labelledby="testimonials-title"><div className="max-w-3xl"><p className="text-sm uppercase tracking-[0.2em] text-indigo-300">Testimonials</p><h2 id="testimonials-title" className="text-3xl md:text-5xl font-bold mt-3">Approved feedback</h2><p className="text-slate-400 mt-4">Only feedback submitted with permission and approved in the admin area is published.</p></div>
    {items.length > 0 && <div className="grid md:grid-cols-3 gap-5 mt-10">{items.map((item) => <figure key={item.id} className={`${card} p-6`}><blockquote className="text-slate-300 leading-7">“{item.quote}”</blockquote><figcaption className="mt-5"><strong>{item.name}</strong><span className="block text-sm text-slate-500">{[item.role,item.organization].filter(Boolean).join(" · ")}</span></figcaption></figure>)}</div>}
    <details className={`${card} p-6 mt-8 max-w-2xl`}><summary className="font-semibold cursor-pointer">Share feedback for review</summary><form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 mt-5"><label className="text-sm">Name<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1 w-full min-h-11 rounded-xl bg-white/5 border border-white/10 px-3"/></label><label className="text-sm">Role<input value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} className="mt-1 w-full min-h-11 rounded-xl bg-white/5 border border-white/10 px-3"/></label><label className="text-sm sm:col-span-2">Organization<input value={form.organization} onChange={(e)=>setForm({...form,organization:e.target.value})} className="mt-1 w-full min-h-11 rounded-xl bg-white/5 border border-white/10 px-3"/></label><label className="text-sm sm:col-span-2">Feedback<textarea required value={form.quote} onChange={(e)=>setForm({...form,quote:e.target.value})} rows={4} className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 p-3"/></label><label className="sm:col-span-2 flex gap-3 text-sm text-slate-300"><input type="checkbox" required checked={form.permission_confirmed} onChange={(e)=>setForm({...form,permission_confirmed:e.target.checked})}/>I give permission for this feedback and my details to be published after review.</label><button className="min-h-11 px-5 rounded-xl bg-indigo-500 font-semibold">Submit for review</button><p aria-live="polite" className="text-sm text-slate-400 self-center">{message}</p></form></details>
  </section>;
}
