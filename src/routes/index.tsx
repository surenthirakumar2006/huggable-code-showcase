import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Icon } from "@/components/site/Icon";
import { BookingModal } from "@/components/site/BookingModal";
import { CatalogModal } from "@/components/site/CatalogModal";
import { GalleryModal } from "@/components/site/GalleryModal";
import { getGalleryImages } from "@/lib/galleryStore";

const HERO_IMG = "/tus-bg.png";
const RAZOR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBpJd5hrVWjiacLa6uq2s-59cb0LMFTj4bw9wET3PGXVdYLwh7gVDHLMpQQGyrz4oBFZjPjImjaGHzUJ_Ids4E-ssrO5hKOkzBlv3fNGNJFc7aA1rhPNoTgf0AXCK5E4W02NqtPpk8BljUHVQzvkF2u1D3Ynq_-3Dh6UfsbcHQHcv5PSSiyXxR8vvXq_akzrYvoO8PmkHKnW9g2yW8pLqO-i0rqyluHgTB2rgV61fAzmrfb-YOjZzOPkw";
const TOOLS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAeZEMF-6TZXeHI-nbfSJJPogyqxTlftKGPYRxxwKh66OypEnILvW52WRd8vKcmDBhoDd7FmbanAl0xYagRFLFj8LqxdJiH4i10_bb6P0_NVsjak9-KhixIKqPCadegVhby0cjiIBBNtF7ovkejjoHW9mTx62Gv1qcjOC8ENIktUMMS4Z3FUXLjM6CA72SVF6mSdeRufmyLv5dcjTrXN1MyRTHoOfSx7A3kBQvmRnfjh-ttTIAwZt_RVw";

const SERVICES = [
  { name: "Hair Cut", price: "₹150", category: "essential" },
  { name: "Kids Hair Cut", price: "₹150", category: "essential" },
  { name: "Beard Trim", price: "₹70", category: "essential" },
  { name: "Shaving", price: "₹70", category: "essential" },
  { name: "Hair Styling", price: "₹250", category: "styling" },
  { name: "Hair Colour", price: "₹250+", category: "styling" },
  { name: "Facial", price: "₹299", category: "spa" },
  { name: "Hair Spa", price: "₹399", category: "spa" },
];

const title = "TUNE UP SALOON | Crafting the Modern Gentleman";
const description =
  "TUNE UP SALOON - A premier barbershop where heritage meets precision. Discover our services, combo offers, and exclusive memberships.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:image", content: HERO_IMG },
    ],
  }),
  component: Index,
});

function Index() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState(() => getGalleryImages().slice(0, 4));

  useEffect(() => {
    // Listen for storage changes in case admin updates gallery in another tab or after mount
    const handleStorageChange = () => {
      setGalleryImages(getGalleryImages().slice(0, 4));
    };
    window.addEventListener("storage", handleStorageChange);
    // Also set an interval just in case they navigate back without reload
    const interval = setInterval(handleStorageChange, 5000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onBookClick={() => setIsBookingModalOpen(true)} />
      <main>
        {/* Hero */}
        <section id="home" className="relative flex min-h-[921px] items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="parallax-bg h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${HERO_IMG}')` }}
              role="img"
              aria-label="Cinematic view of a classic luxury barbershop interior"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-black/20"></div>
          </div>
          <div className="relative z-10 mx-auto flex max-w-[1200px] justify-end px-margin py-section-mobile md:py-section">
            <div className="max-w-3xl text-right">
              <span className="label-md mb-6 inline-block animate-pulse tracking-[0.3em] text-primary drop-shadow-md">
                ESTABLISHED IN TRADITION
              </span>
              <h1 className="display-lg mb-8 uppercase italic text-white drop-shadow-2xl md:text-[84px] md:leading-[1.1]">
                Crafting the <br /> Modern Gentleman
              </h1>
              <p className="body-lg mb-12 ml-auto max-w-xl leading-relaxed text-white/90 drop-shadow-md">
                Where heritage meets precision. Experience a curated grooming ritual designed for
                the man who demands excellence in every detail.
              </p>
              <div className="flex flex-col justify-end gap-6 sm:flex-row">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="title-lg primary-glow rounded-full bg-primary px-10 py-5 text-center uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-primary/50"
                >
                  Book Your Chair
                </button>
                <a
                  href="#services"
                  className="title-lg rounded-full border-2 border-white/80 px-10 py-5 text-center uppercase tracking-widest text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="overflow-hidden bg-surface-lowest py-section-mobile md:py-section"
        >
          <div className="mx-auto max-w-[1200px] px-margin">
            <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-2">
              <div className="relative">
                <div className="aspect-[4/5] border border-outline-variant/30 p-4">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${RAZOR_IMG}')` }}
                    role="img"
                    aria-label="Master barber using a vintage straight razor on a client"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 hidden h-64 w-64 border border-primary/20 bg-background/80 p-2 backdrop-blur-sm lg:block">
                  <div
                    className="h-full w-full bg-cover bg-center grayscale"
                    style={{ backgroundImage: `url('${TOOLS_IMG}')` }}
                    role="img"
                    aria-label="Vintage barbering tools on a dark walnut surface"
                  />
                </div>
              </div>
              <div className="md:pl-20">
                <h2 className="headline-md mb-8 uppercase italic text-primary">
                  Welcome to TUNE UP
                </h2>
                <div className="mb-8 h-px w-20 bg-primary" />
                <p className="body-lg mb-6 leading-relaxed text-on-surface">
                  TUNE UP SALOON isn't just a barbershop; it's a sanctuary for the ritual of grooming.
                  Founded on the principles of traditional barbering, we blend
                  centuries-old techniques with modern precision.
                </p>
                <p className="body-md mb-10 leading-relaxed text-on-surface-variant">
                  Every service is a dialogue between the barber and the client, ensuring that each
                  cut, shave, and sculpt is as unique as the man in the chair. We believe in the
                  permanence of style and the power of a well-crafted appearance.
                </p>
                <a
                  href="#gallery"
                  className="label-md inline-flex items-center gap-4 uppercase tracking-widest text-primary transition-all hover:gap-6"
                >
                  Our Story <Icon name="arrow_forward" className="text-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="relative bg-background py-section-mobile md:py-section"
        >
          <div className="mx-auto max-w-[1200px] px-margin">
            <div className="mb-16 text-center">
              <span className="label-md uppercase tracking-[0.4em] text-primary">
                The Service Menu
              </span>
              <h2 className="display-lg mt-4 text-on-surface">PRICING & SERVICES</h2>
              <div className="primary-filigree mx-auto mt-6 max-w-sm" />
              <button 
                onClick={() => setIsCatalogModalOpen(true)}
                className="mt-6 label-md inline-flex items-center gap-2 uppercase tracking-widest text-primary transition-all hover:text-primary/80"
              >
                <Icon name="auto_stories" className="text-[18px]" />
                View Style Catalog
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <h3 className="headline-sm mb-8 uppercase text-primary border-b border-primary/20 pb-4">Core Services</h3>
                <ul className="space-y-6">
                  {SERVICES.map((s) => (
                    <li key={s.name} className="flex items-center justify-between group">
                      <span className="body-lg text-on-surface transition-colors group-hover:text-primary">{s.name}</span>
                      <div className="dotted-leader flex-1 mx-4 opacity-30" />
                      <span className="title-lg text-primary">{s.price}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-6 bg-surface-container/50 border border-outline-variant/10 rounded-sm">
                  <p className="label-md text-on-surface-variant mb-2">ADDITIONAL SERVICES</p>
                  <p className="body-md text-on-surface">Zero Fade Haircut • Detan • Bridal Services • Head Massage</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="border border-primary/30 p-8 bg-surface-low relative overflow-hidden group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground label-sm px-4 py-1 tracking-widest uppercase">Special</div>
                  <h3 className="headline-sm mb-4 uppercase text-on-surface">Combo Offer</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="body-lg text-on-surface-variant mb-1">Haircut + Beard</p>
                      <p className="body-sm text-on-surface-variant opacity-70">The classic gentleman's combo</p>
                    </div>
                    <span className="display-sm text-primary">₹200</span>
                  </div>
                </div>

                <div className="border border-outline-variant/30 p-8 bg-surface-container relative">
                  <Icon name="workspace_premium" className="absolute top-8 right-8 text-[48px] text-primary/20" />
                  <h3 className="headline-sm mb-2 uppercase text-primary">TUNE UP VIP Membership</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="display-sm text-on-surface">₹999</span>
                    <span className="label-md text-on-surface-variant">/ 1 Year Validity</span>
                  </div>
                  
                  <ul className="space-y-4 body-md text-on-surface-variant">
                    <li className="flex items-start gap-3">
                      <Icon name="check_circle" className="text-primary mt-1 text-[18px]" />
                      <span><strong>15% OFF</strong> on all services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="check_circle" className="text-primary mt-1 text-[18px]" />
                      <span><strong>1 FREE Haircut</strong> every 2 months</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="check_circle" className="text-primary mt-1 text-[18px]" />
                      <span><strong>Priority Booking</strong> for appointments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-surface-low py-section-mobile md:py-section">
          <div className="mx-auto max-w-[1200px] px-margin">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="display-lg uppercase italic text-on-surface">The Gallery</h2>
                <p className="body-lg text-on-surface-variant">
                  A visual testament to our commitment to detail.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square cursor-pointer bg-cover bg-center grayscale transition-all duration-700 hover:grayscale-0"
                  style={{ backgroundImage: `url('${img.url}')` }}
                  role="img"
                  aria-label={img.alt}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="title-lg inline-flex items-center gap-3 rounded-full border border-primary/50 px-8 py-4 uppercase tracking-[0.2em] text-primary transition-all hover:border-primary hover:bg-primary/10"
              >
                View More
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-section-mobile md:py-section">
          <div className="relative z-10 mx-auto max-w-[1200px] px-margin text-center">
            <div className="mb-8 inline-block bg-primary/10 p-1">
              <div className="border border-primary/40 px-8 py-2">
                <span className="label-md uppercase tracking-[0.2em] text-primary">
                  Ready for the Ritual?
                </span>
              </div>
            </div>
            <h2 className="display-lg mb-12 uppercase italic leading-tight text-on-surface md:text-[64px]">
              Secure your slot in the <br /> Master's Chair
            </h2>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="title-lg primary-glow inline-block rounded-full bg-primary px-16 py-6 uppercase tracking-[0.2em] text-primary-foreground transition-all hover:scale-105"
            >
              Book Appointment Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <CatalogModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
      <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} />
    </div>
  );
}
