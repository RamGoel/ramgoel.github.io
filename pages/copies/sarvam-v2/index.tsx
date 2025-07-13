import { Figtree } from "next/font/google";
import Notification from "./components/Notification";
import Header from "./components/Header";
import Hero from "./components/Hero";

const font=Figtree({
  subsets:['latin'],
  weight:['400','500','600','700'],
})
export default function SarvamV2() {
  return <div className={`${font.className} bg-[#ffffeb] min-h-screen`}>
    <Notification />
    <Header />

    <div className="mt-[100px]">

    </div>

   <Hero />
  </div>;
}