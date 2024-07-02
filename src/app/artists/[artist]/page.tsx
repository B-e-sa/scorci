/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePathname } from "next/navigation";
import style from "./style.module.scss"
import { useEffect, useState } from "react";
import data from "@/app/data"
import type { Artist } from "@/app/data";
import Image from "next/image";
import { arno, pxGrotesk } from "@/app/fonts";
import Button from "@/app/components/button/button";

export default function Artist() {
    const pathname = usePathname();
    const [foundArtist, setFoundArtist] = useState<Artist>();

    const formatDateInfo = (date: string) => {
        if (!date) {
            return
        }

        const dateArray = date.split("/");
        return `${dateArray[dateArray.length - 1]}, ${dateArray[dateArray.length - 2]}`
    }

    const unslugify = (slug: string) => {
        return slug
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    useEffect(() => {
        const regularNickname = pathname
            .split("/")[2]
            .replace("-", " ");

        const foundArtist = data.language.pt.find((artist) => (
            artist.nickname === unslugify(regularNickname)
        ))

        if (!foundArtist) return

        setFoundArtist(foundArtist);
    }, [pathname])

    return (
        <div className={`${style["info-grid"]} ${pxGrotesk.className}`}>
            <div className={`${style["first"]}`}>
                <Button>BACK</Button>
                <div style={{ marginTop: 60 }}>
                    {
                        foundArtist?.portrait &&
                        <Image style={{ borderRadius: 999, objectFit: "cover" }}
                            alt=""
                            src={foundArtist?.portrait}
                            height={80}
                            width={80}
                            unoptimized
                        />
                    }
                    <div className={`${style["name"]}`}>
                        <p>{foundArtist?.nickname},</p>
                        <p>{foundArtist?.fullName}</p>
                    </div>
                    <p className={`color-secondary`}>Fatos rápidos</p>
                </div>
            </div>
            <div className={`${style["quick-facts"]}`}>
                <p className={`${arno.className}`}>
                    Nascimento:<span>{formatDateInfo(foundArtist?.wasBorIn!)}</span>
                </p>
                <p className={`${arno.className}`}>
                    Falecimento: <span>{formatDateInfo(foundArtist?.diedIn!)}</span>
                </p>
                <p className={`${arno.className}`}>
                    Most famous painting: <span></span>
                </p>
                <p className={`${arno.className}`}>
                    "First" painting: <span></span>
                </p>
                <p className={`${arno.className}`}>
                    "Last" painting: <span></span>
                </p>
            </div>
            <div className={`${style["middle-column"]}`}>
                {
                    /*
                    foundArtist?.artworks.map(() => {

                    })
                    */
                }
            </div>
            <div className={`${style["synopsis"]}`}>
                <span>Sinopse</span>
                <div>
                    <p>{foundArtist?.description}</p>
                </div>
            </div>
            <div className={`${style["early-life"]}`}>
                <span>Começo de carreira</span>
            </div>
        </div>
    )
}