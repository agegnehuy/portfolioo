import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const exploreLinks = [
  ["Work", "/#Portofolio"],
  ["Services", "/services"],
  ["How I work", "/process"],
  ["Insights", "/insights"],
];

const informationLinks = [
  ["About", "/#About"],
  ["FAQ", "/faq"],
  ["Contact", "/#Contact"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];

const footerLinkClass = "inline-flex min-h-11 items-center rounded-lg text-sm text-slate-300 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]";

export default function Footer() {
  return <footer className="relative border-t border-white/10 bg-[#030014] text-white">
    <div className="mx-auto max-w-7xl px-[5%] py-12 sm:py-16 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-300">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
            Available for meaningful digital projects
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Agegnehu Yelib Tesfa</h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-400">Software developer and digital systems specialist building useful, accessible experiences for people and organizations.</p>
          <a href="mailto:agegnehuyelib01@gmail.com" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl border border-indigo-400/25 bg-indigo-500/10 px-4 font-medium text-indigo-200 transition-[color,background-color,border-color,transform] duration-150 hover:border-indigo-300/40 hover:bg-indigo-500/15 hover:text-white active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]">
            <Mail aria-hidden="true" className="h-5 w-5" strokeWidth={1.75}/>
            <span className="break-all sm:break-normal">agegnehuyelib01@gmail.com</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2}/>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Explore</h2>
            <div className="mt-3 flex flex-col items-start">{exploreLinks.map(([label, to]) => <Link key={to} to={to} className={footerLinkClass}>{label}</Link>)}</div>
          </nav>
          <nav aria-label="Information">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Information</h2>
            <div className="mt-3 flex flex-col items-start">{informationLinks.map(([label, to]) => <Link key={to} to={to} className={footerLinkClass}>{label}</Link>)}</div>
          </nav>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Agegnehu Yelib Tesfa. All rights reserved.</p>
      </div>
    </div>
  </footer>;
}
