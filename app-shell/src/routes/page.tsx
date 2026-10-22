import GithubDialog from "@/components/github/github-dialog";
import { SenaiMark, StationBrand } from "@/components/workspace/station-brand";
import { Workspace } from "@/components/workspace/workspace";

export default function Home() {
    return (
        <Workspace
            brand={<StationBrand />}
            actions={
                <>
                    <div className="hidden md:block">
                        <GithubDialog />
                    </div>
                    <SenaiMark />
                </>
            }
        />
    );
}
