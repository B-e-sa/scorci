"use client";

import { Artist } from "@/app/data";
import getYear from "@/app/data/utils/date/getYear";
import getNumberOfArtworks from "@/app/data/utils/getNumberOfArtworks";
import { cinzel } from "@/app/fonts";
import Image from "next/image";
import style from "./style.module.scss"
import { MouseEvent, useState } from "react";

export default function ArtistCard(artist: Artist) {
    const [isOverPortrait, setIsOverPortrait] = useState(false);

    const {
        diedIn,
        fullName,
        nickname,
        wasBorIn,
        portrait
    } = artist;

    const defaultPortraitScale = "1.07"

    const handlePortraitOver = (e: MouseEvent<HTMLImageElement>) => {
        setIsOverPortrait(!isOverPortrait)
        isOverPortrait
            ? e.currentTarget.style.scale = "1"
            : e.currentTarget.style.scale = defaultPortraitScale
    }

    const portraitEvents = {
        onMouseEnter: handlePortraitOver,
        onMouseLeave: handlePortraitOver
    }

    return (
        <div key={nickname} className={`flex-center column`}>
            <span
                style={{ marginBottom: 10, marginTop: 100 }}
                className={`text-3xl`}
            >
                {nickname}
            </span>
            <div className={`${cinzel.className} secondary`} style={{ marginBottom: 100, fontWeight: 600 }}>
                <span>{getYear(diedIn)}</span>
                <span> - </span>
                <span>{getYear(wasBorIn)}</span>
            </div>
            {
                portrait &&
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className={`${style["image-container"]}`}>
                        <Image
                            {...portraitEvents}
                            style={{
                                objectFit: "cover",
                                userSelect: "none",
                                width: 380,
                                height: 430,
                                scale: defaultPortraitScale,
                                transition: "scale .2s"
                            }}
                            draggable="false"
                            unoptimized
                            alt=""
                            src={portrait} />
                    </div>
                    <span style={{ alignSelf: "start" }}>{getNumberOfArtworks(fullName)}</span>
                </div>
            }

        </div>
    )
}