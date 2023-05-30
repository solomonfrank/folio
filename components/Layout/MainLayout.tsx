import Link from "next/link";
import Preloader from "../Preloader";
import { useRef } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  pageName: string;
};

const NavHeader = () => {
  return (
    <div className="px-[5vw] py-9">
      <nav className="flex justify-between items-center text-gray-400 w-full">
        <div className="">
          <Link
            href="/"
            className="cursor-pointer font-medium text-white text-2xl"
          >
            Rock. Enwerem
          </Link>
        </div>
        <ul className="flex ">
          <li className="cursor-pointer px-6 py-2 hover:text-white  text-base">
            <Link
              href="#project-section"
              className="block hover:border-b-2 active:border-b-2 whitespace-nowrap"
            >
              About
            </Link>
          </li>
          <li className="cursor-pointer px-6 py-2 hover:text-white  text-base">
            <Link
              href="/#"
              className="block hover:border-b-2 active:border-b-2 whitespace-nowrap"
            >
              Work
            </Link>
          </li>
          <li className="cursor-pointer px-6 py-2 hover:text-white text-base">
            <Link
              href="/#"
              className="block hover:border-b-2 active:border-b-2 whitespace-nowrap"
            >
              Blog
            </Link>
          </li>
        </ul>
        <div>
          <div className="toggle-bar flex items-center gap-3">
            <div className="sun-wrapper">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M12 5q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm4.95 2.05q-.275-.275-.275-.688 0-.412.275-.712l1.4-1.425q.3-.3.712-.3.413 0 .713.3.275.275.275.7 0 .425-.275.7L18.35 7.05q-.275.275-.7.275-.425 0-.7-.275ZM20 13q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8 10q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275.425 0 .7.275L7.05 5.65q.275.275.275.7 0 .425-.275.7-.3.275-.7.275-.4 0-.7-.275Zm12.7 12.725-1.4-1.425q-.275-.3-.275-.712 0-.413.275-.688.275-.275.688-.275.412 0 .712.275l1.425 1.4q.3.275.287.7-.012.425-.287.725-.3.3-.725.3t-.7-.3ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm2.225 6.775q-.275-.275-.275-.7 0-.425.275-.7L5.65 16.95q.275-.275.688-.275.412 0 .712.275.3.3.3.713 0 .412-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Zm0-2q1.65 0 2.825-1.175Q16 13.65 16 12q0-1.65-1.175-2.825Q13.65 8 12 8q-1.65 0-2.825 1.175Q8 10.35 8 12q0 1.65 1.175 2.825Q10.35 16 12 16Z" />
              </svg>
            </div>
            <button className="toggle-button w-20 h-8 br rounded-full outline-none bg-amber-400 px-1">
              <div className="toggle-circle w-6 h-6 rounded-full bg-[#8395cd]"></div>
            </button>
            <div className="moon-wrapper">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
              >
                <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025.337.025.662.075-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613 1.15-.612 1.875-1.637.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Zm0-2q2.2 0 3.95-1.212 1.75-1.213 2.55-3.163-.5.125-1 .2-.5.075-1 .075-3.075 0-5.238-2.162Q9.1 10.575 9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.162 2.55Q5 9.8 5 12q0 2.9 2.05 4.95Q9.1 19 12 19Zm-.25-6.75Z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export const MainLayout = ({ children, pageName }: MainLayoutProps) => {
  const div = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <>
      {/* <div
        ref={div}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        className="ogl"
      >

      </div> */}
      <Preloader />
      <div
        className={`main-container ${pageName} invisible absolute w-full bg-gray-900 h-[100%]`}
      >
        <NavHeader />

        {children}
      </div>
    </>
  );
};
