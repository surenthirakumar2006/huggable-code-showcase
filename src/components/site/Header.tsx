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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-margin py-6">
        <div className="flex items-center gap-2">
          <img src="/TUS.png" alt="Tune Up Saloon Logo" className="h-12 w-auto object-contain" />
          <span className="headline-md uppercase tracking-tighter text-primary">TUNE UP SALOON</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={
                i === 0
                  ? "title-lg border-b-2 border-primary pb-1 font-bold uppercase tracking-widest text-primary"
                  : "title-lg uppercase tracking-widest text-on-surface-variant transition-colors duration-300 hover:text-primary"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => {
            if (onBookClick) onBookClick();
            else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-primary rounded-full px-6 py-2.5 text-[14px] font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 active:scale-95"
        >
          Book Now
        </button>
      </nav>
    </header>
  );
}
