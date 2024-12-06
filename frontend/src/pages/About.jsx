import AboutImage from "../assets/frontend_assets/about_img.png";
import Subscribe from "../components/Subscribe";

const About = () => {
  return (
    <>
      <div className="flex gap-2 pt-4 justify-center items-center">
        <div className="text-xl sm:text-3xl text-[#707070] font-medium uppercase">
          ABOUT <span className="text-[#343434] font-bold">US</span>
        </div>
        <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 justify-center pt-10 pb-10">
        <div className="w-full lg:w-[400px]  flex justify-center">
          <img className="w-[90%] lg:w-[500px]" src={AboutImage} alt="" />
        </div>
        <div className="lg:w-[700px] flex justify-center items-center">
          <div className="font-bold">
            <h1 className="text-[#4B5562]  pb-4">
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </h1>
            <h1 className="text-[#4B5562] pb-4">
              Since our inception, we have worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </h1>
            <div className="text-[#1F2937] pb-8">Our Mission</div>
            <h1 className="text-[#4B5562]">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We are dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </h1>
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-4 pb-6 justify-center items-center">
        <div className="text-xl sm:text-2xl text-[#707070]  font-medium uppercase">
          WHY <span className="text-[#343434] font-bold ">CHOOSE US</span>
        </div>
        <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3  pb-6 place-items-center">
        <div className="w-full h-[250px] px-8 py-6 border border-gray-300 flex justify-center items-center  bg--400">
          <div className="w-[320px]">
            <h1 className="pb-4 text-[#000000] font-bold text-md">
              Quality Assurance:
            </h1>

            <h1 className="text-sm text-[#696a6b] font-bold">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </h1>
          </div>
        </div>
        <div className="w-full h-[250px] px-8 py-6 border border-gray-300 flex justify-center items-center  bg--400">
          <div className="w-[320px]">
            <h1 className="pb-4 text-[#000000] font-bold text-md">
              Convenience:
            </h1>
            <h1 className="text-sm text-[#696a6b] font-bold">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </h1>
          </div>
        </div>
        <div className="w-full h-[250px] px-8 py-6 border border-gray-300 flex justify-center items-center  bg--400">
          <div className="w-[320px]">
            <h1 className="pb-4 text-[#000000] font-bold text-md">
              Exceptional Customer Service:
            </h1>
            <h1 className="text-sm text-[#696a6b] font-bold">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </h1>
          </div>
        </div>
      </div>
      <div>
        <Subscribe/>
      </div>
    </>
  );
};

export default About;
