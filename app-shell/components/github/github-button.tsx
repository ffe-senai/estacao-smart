import Image from "next/image";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "cn";

export default function GithubButton({className,...props}:ButtonProps){
    return (
        <Button className={cn("h-10 py-1.5 px-2  border border-white/10 bg-[#24292f] hover:bg-[#32383f]",className)} {...props}>
            <Image
                    src="/logos/github-logo-white.png"
                    alt=""
                    width={1344}
                    height={381}
                    className="h-full w-auto"
                />
                {props.children}
        </Button>
    )
}