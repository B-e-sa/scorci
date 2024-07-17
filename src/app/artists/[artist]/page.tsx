/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/app/components/button";
import type { Artist } from "@/app/data";
import data from "@/app/data";
import { arno, pxGrotesk } from "@/app/fonts";
import slugify from "@/app/utils/slugify";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import unslugify from "../../utils/unslugify";
import style from "./style.module.scss";
import ArtistProfile from "@/app/components/artist-profile";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import ArtoworkScroller from "@/app/components/artwork-scroller";

export default function Artist() {
  const pathname = usePathname();
  const [
    { artworks, borIn, description, diedIn, fullName, nickname, portrait },
    setFoundArtist,
  ] = useState<Artist>({});
  const isSmallScreen = useMediaQuery(769);

  const formatDateInfo = (date: string) => {
    if (!date) return;

    const dateArray = date.split("/");
    return `${dateArray[dateArray.length - 1]}, ${
      dateArray[dateArray.length - 2]
    }`;
  };

  useEffect(() => {
    const foundArtist = data.language.pt.find(
      (artist) => artist.nickname === unslugify(pathname.split("/")[2])
    );

    if (!foundArtist) return;

    setFoundArtist(foundArtist);
  }, [pathname]);

  return (
    <div className={`${style["info-grid"]} ${pxGrotesk.className}`}>
      <div className={`${style["first"]}`}>
        <Link href={"/artists"}>
          <Button>BACK</Button>
        </Link>
        <div className={`${style["info-container"]}`}>
          <ArtistProfile className={`${style["artist"]}`} infoStyle={`${style["info"]}`} {...{ portrait, nickname, fullName }} />
          <p className={`color-secondary`}>Fatos rápidos</p>
        </div>
      </div>
      <div className={`${style["quick-facts"]}`}>
        <p className={`${arno.className}`}>
          Nascimento<span>{formatDateInfo(borIn!)}</span>
        </p>
        <p className={`${arno.className}`}>
          Falecimento <span>{formatDateInfo(diedIn!)}</span>
        </p>
        <p className={`${arno.className}`}>
          Most famous painting <span>{"unknown"}</span>
        </p>
      </div>
      <div className={`${style["middle-column"]}`}>
        {artworks && (
          <ArtoworkScroller
            className={`${style["artworks"]}`}
            artworks={artworks}
            pathname={pathname}
          />
        )}
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
  );
}
