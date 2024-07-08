/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/app/components/button/button";
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

export default function Artist() {
  const pathname = usePathname();
  const [
    { artworks, borIn, description, diedIn, fullName, nickname, portrait },
    setFoundArtist,
  ] = useState<Artist>({});

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
        <div style={{ marginTop: 60 }}>
          <ArtistProfile
            portrait={portrait}
            nickname={nickname}
            fullName={fullName}
          />
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
        {artworks &&
          artworks!.map(({ image, completedIn, name }) => {
            // TODO:
            // after switching all artworks urls for their images,
            // remove the instance checking
            if (image instanceof String) return;

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                key={name}
              >
                <div>
                  <p>{name}</p>
                  <p>{completedIn}</p>
                </div>
                <Link
                  href={
                    name
                      ? `/artists/${pathname.split("/")[2]}/${slugify(name)}`
                      : unslugify(pathname.split("/")[2])
                  }
                  style={{ width: "100%", height: "45%" }}
                >
                  <Image
                    alt=""
                    src={(image as StaticImageData).src}
                    width={500}
                    height={500}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
            );
          })}
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
