import { arno, arnoDisplay, cinzel, pxGrotesk } from "./fonts";
import style from "./page.module.scss";

export default function Home() {
  return (
    <div className={`${pxGrotesk.className} ${style["home-container"]}`}>
      <p className={`${pxGrotesk.className} ${style["home-container-title"]}`}>
        Scorci
      </p>
      <div className="text-center">
        <p className={`${cinzel.className} ${style["home-container-date"]}`}>
          1861 - 2019
        </p>
        <p className={`${style["home-container-paragraph"]}`}>
          To show you a wide variety of artists and their greatest works
        </p>
      </div>
    </div>
  );
}
