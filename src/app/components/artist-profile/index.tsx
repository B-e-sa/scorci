import { Artist } from "@/app/data";
import Image from "next/image";
import style from "./style.module.scss";
import { ComponentProps } from "react";

type Props = ComponentProps<"div"> & Artist;

export default function ArtistProfile({
  portrait,
  nickname,
  fullName,
  ...props
}: Props) {
  return (
    <div className={props.className}>
      {portrait && (
        <Image
          style={{ borderRadius: 999, objectFit: "cover" }}
          alt=""
          src={portrait}
          height={80}
          width={80}
          unoptimized
        />
      )}
      <div className={`${style["artist-profile"]}`}>
        <p>{nickname},</p>
        <p title={fullName}>
          {fullName && fullName?.split(" ").length < 7
            ? fullName
            : fullName?.split(" ").slice(0, 7).join(" ") + "..."}
        </p>
      </div>
    </div>
  );
}
