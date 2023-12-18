import { MainLayout } from "@/components/Layout";
import { useAnimate } from "framer-motion";
import { gsap } from "gsap";

import Apems from "../public/assets/images/apems.png";
import Cashboxng from "../public/assets/images/cashbox.png";
import DeliveryPage from "../public/assets/images/delivery.png";
import Zondo from "../public/assets/images/zondo.png";
import CodeSand from "../public/assets/images/codesand.png";
import Tefconect from "../public/assets/images/tef.png";
import { Project } from "@/components/Element/Project";
import { useEffect, useRef } from "react";

import { GetStaticProps } from "next";
import { jj } from "@/utils/img";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [scope, animate] = useAnimate();
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   if (sectionRef.current) {
  //     let scroll: LocomotiveScroll;
  //     import("locomotive-scroll").then((locomotiveModule) => {
  //       scroll = new locomotiveModule.default({
  //         el: sectionRef.current as HTMLElement,
  //         smooth: true,
  //         resetNativeScroll: true,
  //       });
  //     });

  //     return () => {
  //       if (scroll) scroll.destroy();
  //     };
  //   }
  // }, []);

  return (
    <MainLayout pageName="Home">
      <section
        className="homeContainer sectionWrapper"
        ref={sectionRef}
        id="homeContainer"
        data-scroll-section
      >
        <header
          // ref={scope}

          className="header flex mx-auto  w-[90%] pt-2  mb-24"
        >
          <div className="w-3/5 relative" ref={ref}>
            <div className=" text-white text-3xl mb-9 opacity-0">{`Hi, I'm Rock Enwerem`}</div>
            <h4
              data-animation="title"
              className="relative opacity-0 translate-y-[40px] text-white uppercase text-8xl font-semibold mb-6"
            >
              Frontend <br />
              Developer
            </h4>
            <div
              ref={textRef}
              data-animation="summary"
              className="relative  opacity-0  translate-y-[40px] text-gray-400 text-2xl"
            >
              with years of experience in building products and appealing web
              experiences.
              <br />
              I&apos;ve collaborated with individuals and teams to build
              experiences for small and large enterprises including Pericius,
              Africa prudential, Cashbox.
              <br /> Each project is an opportuinity to learn new concepts
              across multiple domains.
            </div>
          </div>
          <div className="w-2/5">
            {/* <Image className="about-img" src={DevPhoto} alt="dev" width={450} /> */}
            <pre className="ascii">{jj}</pre>
          </div>
        </header>
        <section>
          <div className="w-[90%] mx-auto py-7">
            <h4
              // data-animation="title"
              className="text-white text-2xl uppercase mb-7"
            >
              Recent Projects
            </h4>

            <div id="project-section" className="mb-24 project-wrapper">
              <Project
                title="Apems"
                description="APEMS is an innovative event management solution that lets
            you seamlessly and efficiently execute virtual and hybrid
            events such as annual general meetings, corporate events,
            art shows, music concerts, religious events, meetings and
            much more."
                stacks="ReactJs, Docker, Git, Jira, Ant Design, Google Analytics, Sentry, websocket, AWS IVS, Zoom web
                sdk, Xd adobe, SEO, Redux, React-query, React-Helmet, SASS, CSS Module"
                url="https://apems.co"
                orderLeft="order-last"
                orderRight="order-first"
                src={Apems}
                index={0}
              />
              <Project
                title="Delivery Page"
                description="Delivery Page is a multi-tenant last-mile delivery software that helps delivery companies easily create their own website, accept online bookings and payments, and track their riders in real-time."
                stacks="ReactJs, Git, Ant Design, Google Analytics,Figma, SEO, Redux, React-query, React-Helmet, SASS, CSS Module, Google map sdk"
                url="https://deliverypage.africa"
                orderLeft="order-first"
                orderRight="order-last"
                src={DeliveryPage}
                index={2}
              />

              <Project
                title="Cashbox Finance"
                description="CashBox is a digital savings platform that helps everyone
              “Make saving a habit”. CashBox was founded as a fun way to
              encourage a healthy saving habit and help curb excessive
              spending all on a seamless and easy-to-use interface."
                stacks="ReactJs, Git, Gitlab, Azure board, Google Analytics,Figma, Sentry, Redux, SASS, Bootstrap, Websocket"
                url="#"
                orderLeft="order-last"
                orderRight="order-first"
                src={Cashboxng}
                index={1}
              />
              <Project
                title="Zondo"
                description="Zondos is an email and SMS delivery solution. The software allows users to send and design their own promotional, newsletters, transactional emails and SMS, and features database management, email and SMS automation, landing page management, API and integrations, and more."
                stacks="ReactJs, Typescript, Git, Ant Design, Google Analytics,Figma, SEO, Redux, React-query, React-Helmet, SASS, CSS Module"
                url="https://zondo.vercel.app"
                orderLeft="order-first"
                orderRight="order-last"
                src={Zondo}
                index={3}
              />

              <Project
                title="Tefconnect"
                description="CashBox is a digital savings platform that helps everyone
              “Make saving a habit”. CashBox was founded as a fun way to
              encourage a healthy saving habit and help curb excessive
              spending all on a seamless and easy-to-use interface."
                stacks="ReactJs, Git, Ant Design, Google Analytics,Figma, SEO, Redux, SASS, CSS Module, websocket"
                url="#"
                orderLeft="order-last"
                orderRight="order-first"
                src={Tefconect}
                index={4}
              />

              <Project
                title="Codesandbox clone"
                description="Codesandbox clone"
                stacks="ReactJs, Git, Typescript, framer-motion, Tailwindcss, Javascript"
                url="https://codesanbox-clone.vercel.app/"
                orderRight="order-last"
                orderLeft="order-first"
                src={CodeSand}
                index={4}
              />
            </div>
          </div>
        </section>
        <h4 className="text-gray-400 text-center p-7">
          Want to take your project to the next level? message me <br />
          <span className="text-white text-2xl">enweremrock@gmail.com</span>
        </h4>
      </section>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps<{
  pageName: string;
}> = () => {
  return { props: { pageName: "Home" } };
};
