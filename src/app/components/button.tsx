import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
    return (
        <div style={{ paddingTop: 10, display: "flex", justifyContent: "center", paddingBottom: 10, width: "80px", color: "white", borderRadius: 50, borderWidth: 2, borderStyle: "solid", borderColor: "#282727" }}>
            {children}
        </div>
    )
}