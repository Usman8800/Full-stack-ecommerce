import { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import GirlImage from "../assets/frontend_assets/hero_img.png";
import CardLists from "../components/CardLists";
import PolicyCards from "../components/PolicyCards";
import Subscribe from "../components/Subscribe";
import { ShowContext } from "../context/ShowContext";
import BestSellers from "../components/BestSellers";
const Home = () => {
  const {productList} = useContext(ShowContext)
  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="w-4/5 md:w-[90%] h-[400px] sm:h-[500px] md:h-[400px] lg:h-[450px] xl:h-[650px] 2xl:h-[750px] border border-[#d6d6d6] flex flex-col  md:flex-row md:items-center">
            <div className="md:w-1/2 text-center p-6 sm:p-4">
              <div className="flex gap-2 justify-center items-center">
                <div className="w-14 h-0.5 rounded-lg bg-[#414141]"></div>
                <div className="text-[#414141] text-[10px] sm:text-sm  lg:text-md xl:text-base 2xl:text-2xl font-bold ">OUR BESTSELLERS</div>
              </div>
              <div className="text-[#414141]  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-medium">
                Latest Arrivals
              </div>
              <div className="flex gap-2 justify-center items-center pt-3">
                <div className="text-[#414141] font-bold text-[10px] sm:text-sm  lg:text-md xl:text-base 2xl:text-2xl">SHOP NOW</div>
                <div className="w-14 h-0.5 rounded-lg bg-[#414141]"></div>
              </div>
            </div>
            <div className=" w-full overflow-hidden h-full">
              <img className="w-full h-full object-cover" src={GirlImage} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <CardLists text1={"LATEST"} text2={"COLLECTIONS"} description={"The Best Collections from our All Products For You , Dear ! Lorem ipsum dolor sit amet."} sliceNo1={0} sliceNo2={8} data={productList}/>
        </div>
        <BestSellers/>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-2 mt-16 mb-14">
          <PolicyCards logo={assets.exchange_icon} title={"Easy Exchange Policy"} descripton={"We offer hassle free exchange policy"}/>
          <PolicyCards logo={assets.quality_icon} title={"7 Days Return Policy"} descripton={"We provide 7 days free return policy"}/>
          <PolicyCards logo={assets.support_img} title={"Best customer support"} descripton={"we provide 24/7 customer support"}/>
        </div>

        <div className="flex justify-center items-center">
            <Subscribe/>
        </div>
      </div>
    </>
  );
};

export default Home;
