import Image from "next/image";

export default function Logo({
  className = "h-9 w-auto",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Rectronx Circuits"
      width={200}
      height={60}
      className={className}
      style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
      priority
    />
  );
}
