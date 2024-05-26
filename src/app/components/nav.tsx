import BuyMeACoffeeButton from "@/app/components/BuyMeACoffeeScript";
import ThemeToggle from "@/app/components/theme.util";
import Sidebar from "@/app/components/Sidebar";
import NavToggle from "./navToggle";
import BgToggle from "./bgToggle";

export default function Nav() {
  return (
    <>
      <nav className="fixed z-40 w-full border-b bg-white dark:bg-black">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <NavToggle />
            <div className="flex items-center">
              <ThemeToggle />
              <BuyMeACoffeeButton />
            </div>
          </div>
        </div>
      </nav>
      <Sidebar />
      <BgToggle />
    </>
  );
}
