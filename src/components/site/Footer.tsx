import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-outline-variant/20 bg-surface-lowest pt-section-mobile pb-8 md:pt-section"
    >
      <div className="mx-auto mb-16 grid max-w-[1200px] grid-cols-1 gap-gutter px-margin md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <div className="headline-sm mb-6 uppercase text-primary">Curated Cuts</div>
          <p className="body-md mb-8 max-w-sm text-on-surface-variant">
            Defining the standard for modern grooming. Our commitment to the craft is matched only
            by our dedication to the gentleman's experience.
          </p>
          <div className="flex gap-6">
            {["public", "camera", "mail"].map((icon) => (
              <a
                key={icon}
                href="#"
                aria-label={icon}
                className="text-on-surface-variant transition-colors hover:text-primary"
              >
                <Icon name={icon} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="label-md mb-6 uppercase tracking-widest text-on-surface">Navigation</h4>
          <ul className="space-y-4">
            {["Services", "Barbers", "Shop", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="body-md text-on-surface-variant transition-colors hover:text-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="label-md mb-6 uppercase tracking-widest text-on-surface">Visit Us</h4>
          <p className="body-md mb-4 text-on-surface-variant">
            123 Heritage Row, <br /> London, W1S 2AB
          </p>
          <p className="body-md text-on-surface-variant">
            Tue - Sat: 9am - 8pm <br />
            Sun - Mon: Closed
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-outline-variant/10 px-margin pt-8 md:flex-row">
        <div className="text-[14px] text-on-surface-variant">
          © 2024 CURATED CUTS BARBERING. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          {["Privacy Policy", "Terms of Service", "Careers"].map((item) => (
            <a key={item} href="#" className="text-[14px] text-on-surface-variant hover:text-primary">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
