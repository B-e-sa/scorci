import Button from "../components/button"
import style from "./style.module.scss";

export default function Artists() {
    const artists = Array(10).fill(0)

    return (
        <div className={`${style["page-container"]}`}>
            <div>
                <div className={`${style["button-container"]}`}>
                    <Button>LIST</Button>
                    <Button>FILTER</Button>

                </div>
                <div style={{ outline: "1px solid gray", height: "10%", width: "99%" }}>

                </div>
            </div>
            <div style={{ display: "flex" }}>
                {
                    artists.map(() => (
                        <div key={Math.random() + Math.random()} className={`${style["artist-container"]}`}>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}