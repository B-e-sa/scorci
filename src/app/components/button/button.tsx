import { ReactNode } from "react";
import style from "./style.module.scss"

export default function Button({ children }: { children: ReactNode }) {
    return (
        <button className={`${style["button"]}`}>
            {children}
        </button>
    )
}