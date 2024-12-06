/* @eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cards from "./Cards";
import { ShowContext } from "../context/ShowContext";

const RelatedProducts = ({ category, subCategory }) => {
  const [related, setRelated] = useState([]);
  const {productList} = useContext(ShowContext)
  //   const [card, setCard] = useState([]);
  useEffect(() => {
    if (productList.length > 0) {
      let productsCopy = productList.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [category, subCategory , productList]);

  return (
    <>
      {related.map((e,index) => {
        return (
          <div key={index}>
            <Cards id={e._id} name={e.name} price={e.price} image={e.image[0]} />
          </div>
        );
      })}
    </>
  );
};

RelatedProducts.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
};
export default RelatedProducts;
