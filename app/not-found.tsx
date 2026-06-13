import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-16">
      <div className="text-center px-4 sm:px-6 max-w-lg mx-auto">
        <div className="text-8xl font-bold text-brand-blue mb-4">404</div>
        <h1 className="text-3xl font-bold text-brand-navy mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-10">
          Looks like this page doesn&apos;t exist. Let&apos;s get you back on
          track — or just message us directly if you need help with a project.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary text-base px-6 py-3">
            Go Home
          </Link>
          <WhatsAppButton
            label="Chat with Us"
            message="Hi Rectronx! I need some help."
            className="text-base px-6 py-3"
          />
        </div>
      </div>
    </div>
  );
}
