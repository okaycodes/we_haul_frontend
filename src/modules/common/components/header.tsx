import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-10  bg-primary">
      <div className="w-[96%] text-white max-w-[1600px] mx-auto flex justify-between items-center">
        <Link className="w-25 md:block text-2xl" to="/">
          WeHaul
        </Link>
        <div className="hidden md:flex justify-center gap-4  grow ">
          <Link to="/trips/create">Get Started</Link>
          <Link to="/trips">View Trips</Link>
        </div>
        <MobileNav />
        <div className="hidden md:block w-25"></div>
      </div>
    </header>
  );
}

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [openMenu]);

  const mainClass = `w-full h-full max-h-full bg-primary fixed top-0 z-10 transition-all duration-200 ease-in-out md:hidden ${
    openMenu ? "delay-100 left-[0%]" : "delay-200 -left-[100%]"
  } `;

  return (
    <div className="md:hidden">
      <div className="cursor-pointer" onClick={() => setOpenMenu(true)}>
        <BiMenu
          onClick={() => setOpenMenu(true)}
          className="w-[40px] transition duration-700 ease-in-out md:hidden block h-[40px] text-white"
        />
      </div>
      <div className={mainClass}>
        <div className="relative px-4 h-full flex flex-col justify-between overflow-auto">
          <div className="grow shrink h-max">
            <div className="grow-0 shrink-0 basis-0 flex justify-end mb-4 py-4">
              <FaXmark
                onClick={() => setOpenMenu(false)}
                className="w-[40px] transition duration-700 ease-in-out md:hidden block h-[40px] text-white"
              />
            </div>
            <div className="space-y-4">
              <Link className="block" to="/trips/create">
                Get Started
              </Link>
              <Link className="block" to="/trips">
                View Trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
