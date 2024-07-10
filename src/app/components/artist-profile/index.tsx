import { Artist } from "@/app/data";
import Image from "next/image";
import style from "./style.module.scss";
import { ComponentProps } from "react";

type Props = ComponentProps<"div"> &
  Artist & {
    showFullname?: boolean;
    infoStyle?: string;
  };

export default function ArtistProfile({
  portrait,
  nickname,
  fullName,
  showFullname = true,
  infoStyle,
  ...props
}: Props) {
  return (
    <div className={props.className}>
      {portrait && (
        <Image
          style={{ borderRadius: 999, objectFit: "cover" }}
          alt=""
          src={portrait}
          height={70}
          width={70}
          unoptimized
        />
      )}
      <div className={`${style["artist-profile"]} ${infoStyle}`}>
        <p>{nickname}{showFullname && ","}</p>
        {showFullname && (
          <p title={fullName}>
            {fullName && fullName?.split(" ").length < 7
              ? fullName
              : fullName?.split(" ").slice(0, 7).join(" ") + "..."}
          </p>
        )}
      </div>
    </div>
  );
}
