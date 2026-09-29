import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [["/#Home", "Home"], ["/#Portofolio", "Work"], ["/services", "Services"], ["/#About", "About"], ["/#Contact", "Contact"]];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const active = (to) => to.startsWith("/#") ? location.pathname === "/" && location.hash === to.slice(1) : location.pathname.startsWith(to);

  const navLinkClass = (selected) => `min-h-11 inline-flex items-center px-1 text-sm font-medium border-b-2 transition-colors duration-150 active:scale-[0.96] ${selected ? "text-white border-purple-400" : "text-slate-300 border-transparent hover:text-white"}`;

  return <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#030014]/85 backdrop-blur-xl">
    <div className="mx-auto px-[5%] lg:px-[7%] h-16 flex items-center justify-between">
      <Link to="/#Home" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">agih</Link>
      <div className="hidden lg:flex items-center gap-7">
        {navItems.map(([to, label]) => <Link key={to} to={to} className={navLinkClass(active(to))}>{label}</Link>)}
      </div>
      <button type="button" onClick={() => setMobileOpen((value) => !value)} className="lg:hidden min-w-11 min-h-11 grid place-items-center text-slate-200 active:scale-[0.96]" aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X/> : <Menu/>}</button>
    </div>
    <div id="mobile-nav" className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-150 ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="px-[5%] py-4 grid grid-cols-2 gap-2 bg-[#08051a]">{navItems.map(([to, label]) => <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={`min-h-11 flex items-center rounded-xl px-4 transition-colors duration-150 active:scale-[0.96] ${active(to) ? "bg-indigo-500/20 text-white" : "text-slate-300 hover:bg-white/5"}`}>{label}</Link>)}</div>
    </div>
  </nav>;
}
