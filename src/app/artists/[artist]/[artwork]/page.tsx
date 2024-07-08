"use client";
import type { Artwork } from "@/app/data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import data, { Artist } from "@/app/data";
import unslugify from "../../../utils/unslugify";
import style from "./style.module.scss";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import Button from "@/app/components/button/button";
import ArtistProfile from "@/app/components/artist-profile";

export default function Artwork() {
  const pathname = usePathname();

  const [
    { completedIn, description: artworkDescription, image, name },
    setFoundArtwork,
  ] = useState<Artwork>({});

  const [
    {
      artworks,
      borIn,
      description,
      diedIn,
      fullName,
      movement,
      nickname,
      portrait,
    },
    setFoundArtist,
  ] = useState<Artist>({});

  useEffect(() => {
    const foundArtist = data.language.pt.find(
      (artist) => artist.nickname === unslugify(pathname.split("/")[2])
    );

    if (!foundArtist || !foundArtist.artworks) return;
    setFoundArtist(foundArtist);

    const artwork = foundArtist?.artworks.find(
      (artwork) => artwork.name === unslugify(pathname.split("/")[3])
    );

    if (!artwork) return;
    setFoundArtwork(artwork);
  }, [pathname]);

  return (
    <div className={`${style["grid"]}`}>
      <div className={`${style["authors-file"]}`}>
        <Link
          style={{ zIndex: 10 }}
          href={`/artists/${pathname.split("/")[2]}`}
        >
          <Button>BACK</Button>
        </Link>
        <p>Author's file</p>
      </div>

      <ArtistProfile
        className={`${style["artist"]}`}
        {...{ portrait, nickname, fullName }}
      />

      <div className={`${style["first-description"]}`}>
        <p>{name}</p>
        <p>{completedIn}</p>
      </div>

      <div className={`${style["second-description"]}`}>
        <p>{artworkDescription}</p>
      </div>

      <div className={`${style["image"]}`} style={{ position: "relative" }}>
        <Image
          width={80}
          height={80}
          src={image as StaticImageData}
          alt=""
          unoptimized
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
}
