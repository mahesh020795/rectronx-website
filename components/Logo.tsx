import Image from "next/image";

export default function Logo({
  className = "w-36 h-auto",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Image
      src="/images/logo-transparent.png"
      alt="Rectronx Circuits"
      width={1536}
      height={1024}
      className={className}
      style={
        variant === "light"
          ? { filter: "brightness(0) invert(1)" }
          : undefined
      }
      priority
    />
  );
}
