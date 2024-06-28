import { Artist } from "@/app/data/data";
import getYear from "@/app/data/utils/date/getYear";
import getNumberOfArtworks from "@/app/data/utils/getNumberOfArtworks";
import Image from "next/image";

export default function ArtistCard(artist: Artist) {
    const {
        diedIn,
        fullName,
        nickname,
        wasBorIn,
        portrait
    } = artist;

    return (
        <div key={nickname} className={`flex-center column`}>
            <span style={{ marginBottom: 10, marginTop: 100 }} className="text-3xl">{nickname}</span>
            <div style={{ marginBottom: 100 }}>
                <span>{getYear(diedIn)}</span>
                <span>-</span>
                <span>{getYear(wasBorIn)}</span>
            </div>
            {portrait && <Image style={{ objectFit: "cover", userSelect: "none" }} draggable="false" unoptimized width={380} height={430} alt="" src={portrait}/>}
            <span>{getNumberOfArtworks(fullName)}</span>
        </div>
    )
}