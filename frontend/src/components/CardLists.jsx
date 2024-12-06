import PropTypes from "prop-types";
import Cards from "./Cards";
import { useEffect, useState } from "react";

const CardLists = ({ text1, text2, description, sliceNo1, sliceNo2, data }) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    setCard(data.slice(sliceNo1, sliceNo2));
  }, [data, sliceNo1, sliceNo2]);

  return (
    <>
      <div className="w-4/5">
        <>
          <div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-xl sm:text-3xl text-[#707070] font-bold uppercase">
                {text1} <span className="text-[#343434]">{text2}</span>
              </div>
              <div className="w-12 h-0.5 rounded-lg bg-[#414141]"></div>
            </div>
            <h1 className="text-sm sm:text-md py-2 font-semibold text-center text-[#787878]">
              {description}
            </h1>
          </div>

          <div className="flex justify-center gap-x-20 mt-8 flex-wrap">
            {card.map((e, index) => (
              <div key={index}>
                <Cards
                  id={e._id}
                  price={e.price}
                  image={e.image[0]}
                  name={e.name}
                />
              </div>
            ))}
          </div>
        </>
      </div>
    </>
  );
};
CardLists.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  description: PropTypes.string,
  sliceNo1: PropTypes.number,
  sliceNo2: PropTypes.number,
  data: PropTypes.array.isRequired,
  id: PropTypes.string,
};

export default CardLists;
