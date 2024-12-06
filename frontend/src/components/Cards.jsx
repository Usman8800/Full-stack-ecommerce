/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Cards = ({ id, price, image, name }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="flex justify-center gap-x-20 mt-8 flex-wrap">
        <div>
          <div className="pb-6 cursor-pointer">
            <div className="">
              <img
                className="w-60 h-full rounded-md hover:scale-110 transition ease-in-out"
                src={image}
                alt="image1"
              />
            </div>
            <div className="pt-3 text-sm text-[#414141]">{name}</div>
            <div className="text-[#414141] font-bold">${price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
