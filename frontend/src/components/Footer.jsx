import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 justify-around pb-10 sm:items-center border-b border-gray-400">
        <div className="sm:w-[500px]">
          <img className="w-32 pb-10" src={assets.logo} alt="" />
          <h1 className="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </h1>
        </div>
        <div>
          <div className="text-lg font-bold pb-6">COMPANY</div>
          <div className="text-sm">
            <h1 className="pb-2">Home</h1>
            <h1 className="pb-2">About us</h1>
            <h1 className="pb-2">Delivery</h1>
            <h1 className="pb-2">Private policy</h1>
          </div>
        </div>
        <div>
          <div className="text-lg font-bold pb-6">GET IN TOUCH</div>
          <div className="text-sm">
            <h1 className="pb-2">+1-5415-2452-7572</h1>
            <h1 className="pb-2">usmanali@gmail.com</h1>
           <div className="flex flex-col">
           <a target="_blank" href="https://www.instagram.com/" className="pb-2">Instagram</a>
           <a target="_blank" href="https://github.com/Usman8800/" className="pb-2">Github</a>
           </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-6">
        Copyright 2024@ Usman.dev - All Right Reserved.
      </footer>
    </>
  );
};

export default Footer;
