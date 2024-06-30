import { ReactNode } from "react";
import style from "./style.module.scss"

export default function Button({ children }: { children: ReactNode }) {
    return (
        <div className={`${style["button"]}`}>
            {children}
        </div>
    )
}