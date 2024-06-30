"use client";
import { MutableRefObject, useRef } from "react";
import ArtistsScroller from "../components/artists-scroller";
import Button from "../components/button";
import artistsByCountry from "../data/byCountry";
import style from "./style.module.scss";
import { useDraggable } from "react-use-draggable-scroll";
import { pxGrotesk } from "../fonts";

export default function Artists() {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);

    return (
        <div className={`${pxGrotesk.className} ${style["page-container"]}`} style={{ userSelect: "none" }}>
            <div className={`${style["button-container-wrapper"]}`}>
                <div className={`${style["button-container"]}`}>
                    <Button>FILTER</Button>
                    <Button>LIST</Button>
                </div>
                <div className={`${style["bottom-box"]}`}></div>
            </div>
            <div
                className={`${style["artists-container"]}`}
                {...events}
                ref={ref}
            >
                <ArtistsScroller artistsData={artistsByCountry} />
            </div>
        </div>
    )
}