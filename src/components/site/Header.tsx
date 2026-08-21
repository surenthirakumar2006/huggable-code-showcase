import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  onBookClick?: () => void;
}

export function Header({ onBookClick }: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${scrolled ? "py-4" : "py-6"}`}>
      <nav 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled 
            ? "max-w-[1000px] rounded-full bg-background/95 backdrop-blur-lg shadow-xl shadow-primary/5 border border-outline-variant/20 px-6 py-3" 
            : "max-w-[1200px] px-margin py-2"
        }`}
      >
        <div className="flex items-center gap-3">
          <img 
            src="/TUS.png" 
            alt="Tune Up Saloon Logo" 
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-10" : "h-14"} ${!scrolled ? "brightness-0 invert" : ""}`} 
          />
          <span className={`font-display uppercase tracking-tighter transition-all duration-500 ${scrolled ? "text-2xl text-primary" : "text-3xl font-medium text-white drop-shadow-md"}`}>
            TUNE UP SALOON
          </span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`label-md uppercase tracking-widest transition-colors duration-300 relative group ${
                scrolled 
                  ? "text-on-surface-variant hover:text-primary" 
                  : "text-white/80 hover:text-white drop-shadow-md"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-primary" : "bg-white"}`}></span>
            </a>
          ))}
        </div>
        
        <button
          onClick={() => {
            if (onBookClick) onBookClick();
            else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`rounded-full px-7 py-2.5 text-[14px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-md ${
            scrolled
              ? "bg-primary text-primary-foreground shadow-primary/20 hover:shadow-lg hover:shadow-primary/40"
              : "bg-white text-primary hover:bg-white/90 shadow-black/20"
          }`}
        >
          Book Now
        </button>
      </nav>
    </header>
  );
}
