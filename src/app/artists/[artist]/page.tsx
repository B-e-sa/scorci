/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePathname } from "next/navigation";
import style from "./style.module.scss"
import { useEffect, useState } from "react";
import data from "@/app/data"
import type { Artist } from "@/app/data";
import Image, { StaticImageData } from "next/image";
import { arno, pxGrotesk } from "@/app/fonts";
import Button from "@/app/components/button/button";
import Link from "next/link";

export default function Artist() {
    const pathname = usePathname();
    const [{
        artworks,
        borIn,
        description,
        diedIn,
        fullName,
        nickname,
        portrait
    }, setFoundArtist] = useState<Artist>({});

    const formatDateInfo = (date: string) => {
        if (!date) return;

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
                <Link href={"/artists"}>
                    <Button>BACK</Button>
                </Link>
                <div style={{ marginTop: 60 }}>
                    {
                        portrait &&
                        <Image style={{ borderRadius: 999, objectFit: "cover" }}
                            alt=""
                            src={portrait}
                            height={80}
                            width={80}
                            unoptimized
                        />
                    }
                    <div className={`${style["name"]}`}>
                        <p>{nickname},</p>
                        <p title={fullName}>{fullName && fullName?.split(" ").length < 7 ? fullName : fullName?.split(" ").slice(0, 7).join(" ") + "..."}</p>
                    </div>
                    <p className={`color-secondary`}>Fatos rápidos</p>
                </div>
            </div>
            <div className={`${style["quick-facts"]}`}>
                <p className={`${arno.className}`}>
                    Nascimento:<span>{formatDateInfo(borIn!)}</span>
                </p>
                <p className={`${arno.className}`}>
                    Falecimento: <span>{formatDateInfo(diedIn!)}</span>
                </p>
                <p className={`${arno.className}`}>
                    Most famous painting: <span>{"unknown"}</span>
                </p>
            </div>
            <div className={`${style["middle-column"]}`}>
                {
                    artworks && artworks!.map(({ image, completedIn, name }) => {
                        // TODO: 
                        // after switching all artworks urls for their images,
                        // remove the instance checking
                        if (image instanceof String) return

                        return (
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} key={name}>
                                <div>
                                    <p>{name}</p>
                                    <p>{completedIn}</p>
                                </div>
                                <Image
                                    alt=""
                                    src={(image as StaticImageData).src}
                                    width={500}
                                    height={500}
                                    style={{
                                        width: "100%",
                                        height: "45%",
                                        minHeight: "45%",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className={`${style["synopsis"]}`}>
                <span>Sinopse</span>
                <div>
                    <p>{description}</p>
                </div>
            </div>
            <div className={`${style["early-life"]}`}>
                <span>Começo de carreira</span>
            </div>
        </div>
    )
}