import { cinzel, pxGrotesk, roxBorough } from "./fonts";
import style from "./page.module.scss";
import { default as Arrow } from "./components/icons/arrow"

export default function Home() {
  return (
    <div className={`${pxGrotesk.className} ${style["home-container"]} primary`}>
      <p className={`${pxGrotesk.className} ${style["home-container-title"]}`}>
        Scorci
      </p>
      <div className="text-center">
        <p className={`${roxBorough.className} ${style["home-container-date"]}`}>
          1861 - 2019
        </p>
        <p className={`${style["home-container-paragraph"]}`}>
          To show you a wide variety of artists and their greatest works
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", bottom: 30 }}>
        <div style={{ position: "relative", width: 35, height: 35, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(90deg)", borderRadius: 100, backgroundColor: "white" }}>
          <Arrow style={{ height: "100%", width: "100%", position: "relative", left: 1.4 }} />
        </div>
        <span style={{ marginTop: 10 }}>DISCOVER</span>
      </div>
    </div>
  );
}
