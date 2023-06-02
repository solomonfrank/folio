const Preloader = () => {
  return (
    <section className="preloader fixed font-sans z-10 w-100 h-100 bg-gray-950 top-0 left-0 right-0 bottom-0">
      <div className="intro w-1/2 m-auto text-white mt-[15%]">
        <div className="intro-title">
          I&apos;m Rock Enwerem, a skilled frontend engineer.
          <br />
          with years of experience in building products and appealing web
          applications.
          <br />
          I&apos;ve collaborated with individuals and businesses in different
          capacities to build to user friendly applications.
        </div>
      </div>
      <div className="count absolute text-5xl bottom-10 left-[50%] text-white">
        0%
      </div>
    </section>
  );
};

export default Preloader;
