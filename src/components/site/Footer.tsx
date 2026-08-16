import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-outline-variant/20 bg-surface-lowest pt-section-mobile pb-8 md:pt-section"
    >
      <div className="mx-auto mb-16 grid max-w-[1200px] grid-cols-1 gap-gutter px-margin md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src="/TUS.png" alt="Tune Up Saloon Logo" className="h-10 w-auto object-contain" />
            <div className="headline-sm uppercase text-primary">TUNE UP SALOON</div>
          </div>
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
            Charles Nagar 1st Street Corner, <br /> Tiruvottiyur, Chennai – 600019
          </p>
          <p className="body-md mb-4 text-on-surface-variant">
            <Icon name="phone" className="inline-block mr-2 align-middle text-[18px]" />
            <a href="tel:9962226022" className="hover:text-primary">9962226022</a>
          </p>
          <p className="body-md text-on-surface-variant">
            Mon - Sun: 8:00 AM - 9:00 PM <br />
            (No Holiday)
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-outline-variant/10 px-margin pt-8 md:flex-row">
        <div className="text-[14px] text-on-surface-variant">
          © {new Date().getFullYear()} TUNE UP SALOON. ALL RIGHTS RESERVED.
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
