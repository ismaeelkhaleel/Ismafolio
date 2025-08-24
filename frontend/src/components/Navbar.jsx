import ThemeToggle from "./ThemeToggle";
import { FileDown } from "lucide-react";

function Navbar() {
  return (
    <div
      className="w-4/5 mx-auto fixed bottom-15 left-0 right-0 flex items-center justify-between px-5 py-3 
                    rounded-2xl shadow-lg 
                    bg-transparent backdrop-blur-xl"
    >
      <div>
        <h3 className="text-lg font-bold dark:text-white">Ismafolio</h3>
      </div>

      <div className="flex items-center gap-4">
        <FileDown />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
