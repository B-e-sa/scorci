"use client";
import { MutableRefObject, useRef } from "react";
import ArtistsScroller from "../components/artists-scroller";
import Button from "../components/button";
import artistsByCountry from "../data/byCountry";
import style from "./style.module.scss";
import { useDraggable } from "react-use-draggable-scroll";

export default function Artists() {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);

    return (
        <div className={`${style["page-container"]}`} style={{ userSelect: "none" }}>
            <div style={{ borderRight: "2px solid #272727" }}>
                <div className={`${style["button-container"]}`}>
                    <Button>LIST</Button>
                    <Button>FILTER</Button>
                </div>
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