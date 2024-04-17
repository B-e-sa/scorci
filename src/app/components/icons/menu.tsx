import { ComponentProps } from "react";

export default function MenuIcon(props?: ComponentProps<"svg">) {
  return (
    <svg
      width="800px"
      height="800px"
      {...props}
      className={props?.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Menu / Menu_Duo_LG">
          {" "}
          <path
            id="Vector"
            d="M3 15H21M3 9H21"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
