import contact from "../assets/frontend_assets/contact_img.png";
import Subscribe from '../components/Subscribe'
const Contact = () => {
  return (
    <>
      <div className="px-4 sm:px-8 lg:px-16 py-8">
        {/* Header */}
        <div className="flex gap-2 pt-4 pb-6 justify-center items-center">
          <div className="text-xl sm:text-2xl lg:text-3xl text-[#707070] font-bold uppercase">
            CONTACT <span className="text-[#343434] font-bold">US</span>
          </div>
          <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {/* Image Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            <div className="w-[600px]">
              <img src={contact} alt="Contact" />
            </div>

            {/* Information Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              {/* Store Info */}
              <div>
                <h3 className="text-xl font-bold text-[#343434] pb-5">
                  Our Store
                </h3>
                <p className="text-[#707070] text-sm">
                  <h1 className="pb-3 text-md font-bold">
                    {" "}
                    54709 Willms Station <br />
                    Suite 350, Washington, USA <br />
                  </h1>
                  <h1 className="text-md font-bold">
                    Tel: (415) 555-0132 <br />
                    Email: admin@forever.com
                  </h1>
                </p>
              </div>

              {/* Careers Info */}
              <div>
                <h3 className="text-xl font-bold pb-5 text-[#343434]">
                  Careers at Forever
                </h3>
                <p className="text-[#707070] text-md pb-4 font-bold">
                  Learn more about our teams and job openings.
                </p>
                <button className="mt-2 px-7 py-3 bg-white text-black  hover:bg-black hover:text-white transition ease-all duration-300  border border-black">
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Subscribe/>
      </div>
    </>
  );
};

export default Contact;
``;
