import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ReadmeBanner({className,white}:{className?:string,white?:true}) {
    return (
        <div className={cn("w-full flex items-center justify-center gap-4",className)}>
            <Image
                src="/logos/smart_logo_cropped.png"
                alt="Estação SMART 4.0"
                width={2010}
                height={1415}
                className={`h-auto w-[25%] ${white&&"bg-white p-3"}`}
            />
            <Image
                src="/logos/SENAI_logo.png"
                alt="SENAI"
                width={1600}   // ← SENAI file's real width
                height={400}   // ← SENAI file's real height
                className="h-auto w-[70%]"
            />
        </div>
    );
}