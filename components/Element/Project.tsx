import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type ProjectProps = {
  title: string;
  description: string;
  stacks: string;
  src: StaticImageData;
  url: string;
  orderLeft: string;
  orderRight: string;
  index: number;
};
export const Project = ({
  title,
  description,
  stacks,
  src,
  url,
  orderLeft,
  orderRight,
  index,
}: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-24">
      <div className="flex  items-center gap-24">
        <div
          data-animation="projectDescription"
          className={`text-white basis-[50%] ${orderLeft}`}
        >
          <div className=" project-d-title first:uppercase text-7xl font-medium mb-3">
            {title}
          </div>
          <p className="project-d-para text-base mb-6 text-gray-400">
            {description}
          </p>
          <h4>Tech stack</h4>
          <div className="mb-3 text-gray-400">{stacks}</div>

          <Link
            href={url}
            target="_blank"
            className="border-2 w-48 py-2 rounded-md inline-block text-center"
          >
            Visit
          </Link>
        </div>
        <div
          ref={ref}
          className={`project-img-container  project-img-container-${index} relative basis-[50%] flex  items-center justify-center ${orderRight}`}
        >
          <div
            data-animation="projectAnimation"
            className={`z-10 w-full reveal absolute top-0 right-0  bg-[#111827]  h-full reveal-${index}`}
          ></div>

          <Image
            src={src}
            alt="apems"
            className="project-img rounded-lg object-fill object-center  h-[450px]"
          />
        </div>
      </div>
    </div>
  );
};
