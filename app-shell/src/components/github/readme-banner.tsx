import { cn } from "@/lib/utils";

export default function ReadmeBanner({
  className,
  white,
}: {
  className?: string;
  white?: true;
}) {
  return (
    <div className={cn("w-full flex items-center justify-center gap-4", className)}>
      <img
        src="/logos/smart_logo_cropped.png"
        alt="Estação SMART 4.0"
        width={2010}
        height={1415}
        className={cn("h-auto w-[25%]", white && "bg-white p-3")}
      />
      <img
        src="/logos/SENAI_logo.png"
        alt="SENAI"
        width={1600}
        height={400}
        className="h-auto w-[70%]"
      />
    </div>
  );
}