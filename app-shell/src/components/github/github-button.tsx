import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export default function GithubButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={cn(
        "h-10 border border-white/10 bg-[#24292f] px-2 py-1.5 hover:bg-[#32383f]",
        className
      )}
      {...props}
    >
      <img
        src="/logos/github-logo-white.png"
        alt="GitHub"
        width={1344}
        height={381}
        className="h-full w-auto"
      />
      {children}
    </Button>
  );
}