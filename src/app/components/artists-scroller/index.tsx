import { ArtistsByCountry } from "@/app/data/byCountry";
import style from "./style.module.scss"
import ArtistCard from "../artist-card";

export default function ArtistsScroller({ artistsData }: { artistsData: ArtistsByCountry }) {    
    return (
        Object.keys(artistsData).map((key) => (
            <div key={key} style={{ position: "relative" }} className={`${style["artists-scroller"]}`}>
                {
                    artistsData[key].map((artist) => (
                        <ArtistCard key={artist.nickname} {...artist} />
                    ))
                }
                <div className={`${style["country"]}`}>
                    {key}
                </div>
            </div>
        ))
    )
}