"use client";
import { usePathname } from "next/navigation";
import style from "./style.module.scss"
import { useEffect } from "react";
import data from "@/app/data"

export default function Artist() {
    const pathname = usePathname();

    useEffect(() => {
        data.language.pt
    }, [])

    return (
        <div className={`${style["info-grid"]}`}>
            <div><p>{pathname.split("/")[2]}</p></div>
            <div></div>
            <div></div>
            <div><p>{pathname.split("/")[2]}</p></div>
            <div></div>
            <div></div>
        </div>
    )
}