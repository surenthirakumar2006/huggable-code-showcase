import { Icon } from "./Icon";

export function ChatBubble() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="group relative flex items-center justify-end">
        <div className="pointer-events-none absolute right-full mr-4 flex items-center opacity-0 transition-all duration-300 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="min-w-[200px] rounded-lg border border-outline-variant/30 bg-surface-high p-4 shadow-xl">
            <p className="label-md mb-1 uppercase text-primary">Get in touch</p>
            <p className="text-[12px] text-on-surface-variant">
              Direct line to our master barbers
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={scrollToContact}
          aria-label="Chat with us"
          className="animate-bounce rounded-full bg-primary p-5 text-primary-foreground primary-glow transition-transform duration-300 hover:scale-110 hover:animate-none"
        >
          <Icon name="chat" className="text-[32px]" />
        </button>
      </div>
    </div>
  );
}
