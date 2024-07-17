/* eslint-disable react/no-unescaped-entities */
"use client";
import ArtistProfile from "@/app/components/artist-profile";
import Button from "@/app/components/button";
import type { Artwork } from "@/app/data";
import data, { Artist } from "@/app/data";
import { arno, pxGrotesk } from "@/app/fonts";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Magnifier from "react-magnifier";
import unslugify from "../../../utils/unslugify";
import style from "./style.module.scss";

export default function Artwork() {
  const pathname = usePathname();
  const [isGridRetracted, setIsGridRetracted] = useState(false);

  const [
    { completedIn, description: artworkDescription, image, name },
    setFoundArtwork,
  ] = useState<Artwork>({});

  const [{ fullName, nickname, portrait }, setFoundArtist] = useState<Artist>(
    {}
  );

  const isSmallScreen = useMediaQuery(767);

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

  useEffect(() => {
    if (isSmallScreen) setIsGridRetracted(false);
  }, [isSmallScreen]);

  const retractedGrid = `
      "first third fifth" 
      "second fourth fifth"`;

  const defaultGrid = `
      "first fifth fifth" 
      "second fifth fifth"`;

  const HiddeableDiv = ({
    className,
    inverse = false,
    children,
  }: {
    className?: string;
    inverse?: boolean;
    children: ReactNode;
  }) => {
    const element = <div className={className}>{children}</div>;

    if (inverse) {
      if (isGridRetracted) {
        return element;
      }
    } else {
      if (!isGridRetracted) {
        return element;
      }
    }
  };

  return (
    <div
      className={`${style["grid"]} ${pxGrotesk.className}`}
      style={{
        gridTemplateAreas: isGridRetracted ? defaultGrid : retractedGrid,
      }}
    >
      <div className={`${style["authors-file"]}`}>
        <Link
          style={{ zIndex: 10 }}
          href={`/artists/${pathname.split("/")[2]}`}
        >
          <Button>BACK</Button>
        </Link>
        <p className={`${arno.className}`}>Author's file</p>
      </div>

      <ArtistProfile
        className={`${style["artist"]}`}
        {...{ portrait, nickname, fullName }}
      />

      <HiddeableDiv className={`${style["first-description"]}`}>
        <div>
          <p>{name}</p>
          <Button
            className={`${style["retract-btn"]}`}
            onClick={() => {
              setIsGridRetracted(true);
            }}
          >
            RECOLHER
          </Button>
        </div>
        <p>{completedIn}</p>
      </HiddeableDiv>

      <HiddeableDiv className={`${style["second-description"]}`}>
        <p>{artworkDescription}</p>
      </HiddeableDiv>

      <div className={`${style["image"]}`} style={{ position: "relative" }}>
        <HiddeableDiv inverse>
          <Button
            onClick={() => setIsGridRetracted(false)}
            className={`${style["desc-button"]}`}
          >
            DESCRIÇÃO
          </Button>
        </HiddeableDiv>
        <Magnifier
          className={`${style["magnifier"]}`}
          width={"100%"}
          height={"100%"}
          src={(image as StaticImageData)?.src}
        />
      </div>
    </div>
  );
}
