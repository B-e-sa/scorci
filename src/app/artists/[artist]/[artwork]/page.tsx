"use client";
import type { Artwork } from "@/app/data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import data, { Artist } from "@/app/data"
import unslugify from "../../../utils/unslugify";
import style from "./style.module.scss"
import Image from "next/image";
import type { StaticImageData } from "next/image";


export default function Artwork() {
    const pathname = usePathname();

    const [{
        completedIn,
        description: artworkDescription,
        image,
        name
    }, setFoundArtwork] = useState<Artwork>({});

    const [{
        artworks,
        borIn,
        description,
        diedIn,
        fullName,
        movement,
        nickname,
        portrait
    }, setFoundArtist] = useState<Artist>({})

    useEffect(() => {
        const foundArtist = data.language.pt.find((artist) => (
            artist.nickname === unslugify(pathname.split("/")[2])
        ))

        if (!foundArtist || !foundArtist.artworks) return;
        setFoundArtist(foundArtist);

        const artwork = foundArtist?.artworks.find((artwork) => (
            artwork.name === unslugify(pathname.split("/")[3])
        ))

        if (!artwork) return;
        setFoundArtwork(artwork);
    }, [pathname])

    return (
        <div className={`${style["grid"]}`}>
            <div className={`${style["authors-file"]}`}>
                <p>authors file</p>
            </div>


            <div className={`${style["artist"]}`}>
                <Image src={portrait as StaticImageData} alt="" width={80} height={80} />
                <p>{nickname},</p>
                <p>{fullName}</p>
            </div>

            <div>
                <p>{name}</p>
                <p>{completedIn}</p>
            </div>

            <div className={`${style["description"]}`}>
                <p>{artworkDescription}</p>
            </div>

            <div className={`${style["image"]}`} style={{ position: "relative" }}>
                <Image
                    width={80}
                    height={80}
                    src={(image) as StaticImageData}
                    alt=""
                    unoptimized
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        position: "absolute"
                    }}
                />
            </div>
        </div>
    )
}