import { useContext, useEffect, useState } from "react";
import CardLists from "./CardLists";
import { ShowContext } from "../context/ShowContext";

const BestSellers = () => {

    const {productList} = useContext(ShowContext)
    const [bestSeller , setBestSeller] = useState([]);
    useEffect(()=>{
        const bestProduct = productList.filter((item)=>(item.bestSellers))
        setBestSeller(bestProduct.slice(0,4))
    },[productList])

    console.log(productList)
  return (
    <>
      <div className="flex justify-center mt-20">
        <CardLists
          id={productList._id}
          text1={"BEST"}
          text2={"SELLERS"}
          description={
            "The Best Collections from our All Products For You , Dear ! Lorem ipsum dolor sit amet."
          }
          sliceNo1={0}
          sliceNo2={5}
          data={bestSeller}
        />
      </div>
    </>
  );
};

export default BestSellers;
