import GithubDialog from "@/components/github/github-dialog";
import ReadmeBanner from "@/components/github/readme-banner";
import RastreabilidadeQrCode from "@/modules/rastreabilidade-qrcode";

export default function Home() {
  return (
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-evenly self-center gap-4 px-4 text-center">
        
        <div className="flex gap-4 items-center justify-center w-full">
          <GithubDialog /> 
          <ReadmeBanner className="w-64"/>
        </div>

        <RastreabilidadeQrCode/>
        
      </main>
  );
}
