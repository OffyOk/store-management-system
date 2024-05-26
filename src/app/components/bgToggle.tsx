"use client";
import navToggle from "../hooks/useNavTog";

export default function BgToggle() {
  return (
    <div
      id="navContent"
      onClick={navToggle}
      className="hidden top-[72px] z-20 left-0 right-0 fixed w-screen h-screen bg-slate-400/50"
    ></div>
  );
}
