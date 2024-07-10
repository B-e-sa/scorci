import { Artwork } from "@/app/data";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import style from "./style.module.scss";
import slugify from "@/app/utils/slugify";
import unslugify from "@/app/utils/unslugify";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  pathname: string;
  artworks: Artwork[];
};

export default function ArtoworkScroller({
  pathname,
  artworks,
  ...props
}: Props) {
  const isMediumScreen = useMediaQuery(1025);

  return (
    artworks &&
    artworks!.map(({ image, completedIn, name }) => {
      // TODO:
      // after switching all artworks urls for their images,
      // remove the instance checking
      if (image instanceof String) return;

      return (
        <div
          className={`${style["artwork-container"]} ${props.className}`}
          key={name}
        >
          <div>
            <p>{name}</p>
            <p>{completedIn}</p>
          </div>
          <Link
            href={
              name
                ? `/artists/${pathname.split("/")[2]}/${slugify(name)}`
                : unslugify(pathname.split("/")[2])
            }
            style={{
              width: isMediumScreen ? "100%" : "300px",
              height: isMediumScreen ? "45%" : "100%",
            }}
          >
            <Image
              alt=""
              src={(image as StaticImageData).src}
              width={500}
              height={500}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>
      );
    })
  );
}
