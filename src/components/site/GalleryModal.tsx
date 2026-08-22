import { Icon } from "./Icon";
import { useEffect } from "react";

const FULL_GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkD03Q68BnJv7JCwznLbMBAcwbtHV6tI-8jwnrH9cpy1Cqg69Ol39a6ebLO8EbTTUsidoC2Acl_w5BHkOu1mgYt-PpCopxwiyykCMEA-7gJRydthvhrG3eX_XCBfcAqDKI0Hoii0StimjpIaGVpdAWRiYQZlNZyv6tIsFzcE9d934LQRb7FOtP4nPememxkRd26dmMFli6j6U33Mo6NH8qG7FF_XZRvMMxZTS28Jx97f9oXhnORkejg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-FkL8xmwFGj6OYkWuvGv9_PVmkZtZYxhNqHZiOzYP95n294Wro_yHfp-nSoYjEtAufl9B8X6E4rh78A1dQLzTvXXkpP-u9a5t_4SzLZcVpioKsI3SbmyJKgJs3BHpN2FmmVB0WsWAafqpUvDqpZND8VcbcQZTwKR9o1piWVKmVv-B0Fe0lNYJc6-VGgqC1p1ofCv_LwZCjq0C4-o-Eybiu93cqSNwKEgznT2yiRqMwMK5W2tFfAWNPg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHFC3je60Xr8B1a7i3wYVIsuu29R36qif559t046wmNeiPQShnpTE6N0fNKi37IWSH5K1FFe3RKu-7ZRNA4DjsRazJ3xstMxkwp9_DzK5PNUleGOmDKCFxKCpqDz7AD7LREnoj4cpAJpaj8mda5jYSO5CSXuOJYWhC9PUSK7yqBaMU_RdMn5B07wvifU_KJaSU2tZHi49-mTmUQR_Aow4aaHU0wLxqoT24gCZYy6iCPHsC6QpcoeS6ug",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZlaUnMzkEVnZ6mfbDwr_Hk6L_Tb2ZPIuWE4sDUabt8BTOzR4j-GpTey8HK1rARPtfYCaBt1T1dlrONbB6B5EiZVhUR6FSgYMARJta9cDZmV3wNMTvfD1DGZ0dfXizCHeQH4ImJTfusW1jNbCUx59EfANGSTP4tjgYlczORRlif3BjiIIEVQQWxoZy00GmNkF1HsAbEYAS6NNpvvcq8vpzmAug7QEUHd_O0JDHqa6fPNCqT7sVAg9PeQ",
  // Repeating for a fuller gallery effect
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkD03Q68BnJv7JCwznLbMBAcwbtHV6tI-8jwnrH9cpy1Cqg69Ol39a6ebLO8EbTTUsidoC2Acl_w5BHkOu1mgYt-PpCopxwiyykCMEA-7gJRydthvhrG3eX_XCBfcAqDKI0Hoii0StimjpIaGVpdAWRiYQZlNZyv6tIsFzcE9d934LQRb7FOtP4nPememxkRd26dmMFli6j6U33Mo6NH8qG7FF_XZRvMMxZTS28Jx97f9oXhnORkejg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-FkL8xmwFGj6OYkWuvGv9_PVmkZtZYxhNqHZiOzYP95n294Wro_yHfp-nSoYjEtAufl9B8X6E4rh78A1dQLzTvXXkpP-u9a5t_4SzLZcVpioKsI3SbmyJKgJs3BHpN2FmmVB0WsWAafqpUvDqpZND8VcbcQZTwKR9o1piWVKmVv-B0Fe0lNYJc6-VGgqC1p1ofCv_LwZCjq0C4-o-Eybiu93cqSNwKEgznT2yiRqMwMK5W2tFfAWNPg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHFC3je60Xr8B1a7i3wYVIsuu29R36qif559t046wmNeiPQShnpTE6N0fNKi37IWSH5K1FFe3RKu-7ZRNA4DjsRazJ3xstMxkwp9_DzK5PNUleGOmDKCFxKCpqDz7AD7LREnoj4cpAJpaj8mda5jYSO5CSXuOJYWhC9PUSK7yqBaMU_RdMn5B07wvifU_KJaSU2tZHi49-mTmUQR_Aow4aaHU0wLxqoT24gCZYy6iCPHsC6QpcoeS6ug",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCZlaUnMzkEVnZ6mfbDwr_Hk6L_Tb2ZPIuWE4sDUabt8BTOzR4j-GpTey8HK1rARPtfYCaBt1T1dlrONbB6B5EiZVhUR6FSgYMARJta9cDZmV3wNMTvfD1DGZ0dfXizCHeQH4ImJTfusW1jNbCUx59EfANGSTP4tjgYlczORRlif3BjiIIEVQQWxoZy00GmNkF1HsAbEYAS6NNpvvcq8vpzmAug7QEUHd_O0JDHqa6fPNCqT7sVAg9PeQ",
];

export function GalleryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-md border border-outline-variant/30 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-4">
          <h2 className="headline-md uppercase text-on-surface italic">Full Portfolio</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-low hover:text-on-surface"
          >
            <Icon name="close" className="text-[24px]" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {FULL_GALLERY.map((src, i) => (
              <div key={i} className="group relative mb-4 overflow-hidden rounded-sm border border-outline-variant/20">
                <img 
                  src={src} 
                  alt={`Gallery image ${i + 1}`}
                  className="w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
