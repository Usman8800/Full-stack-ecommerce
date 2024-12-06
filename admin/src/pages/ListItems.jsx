import { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import axios from "axios";
import { backend_url } from "../App";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const ListItems = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backend_url + "/api/product/listProducts"
      );
      console.log(response.data.allProducts);

      if (response.data.success) {
        setList(response.data.allProducts); // Assuming 'products' is in the response
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const DeleteItems = async (productId) => {
    try {
      const response = await axios.post(backend_url + '/api/product/removeProduct', { id: productId });
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success('Removed Successfully');
        setList(prevList => prevList.filter(item => item._id !== productId));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <div className="w-[20%]">
          <SidePanel />
        </div>
        <div className="flex justify-center w-[80%] pr-8">
          <div className="p-4 w-full">
            <h2 className="text-xl font-bold mb-4">All Products List</h2>
            <div className="flex flex-row bg-gray-100 border-gray-200">
              <div className="flex-1 font-bold  border-gray-200 px-4 py-2 text-left">
                Image
              </div>
              <div className="flex-1 font-bold  border-gray-200 px-4 py-2 text-left">
                Name
              </div>
              <div className="flex-1 font-bold  border-gray-200 px-4 py-2 text-left">
                Category
              </div>
              <div className="flex-1 font-bold  border-gray-200 px-4 py-2 text-left">
                Price
              </div>
              <div className="flex-1 px-4 py-2 text-left">Action</div>
            </div>
            {list.map((e, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-row bg-gray-50 border mt-2 border-gray-300"
              >
                <div className="flex-1 w-[16%] border-gray-200 px-4 py-2 text-left items-center">
                  <div className="w-16 h-16 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={e.image[0]}
                      alt={e.name}
                    />
                  </div>
                </div>
                <div className="flex-1 w-[16%] text-sm  border-gray-200 px-4 py-2 text-left">
                  {e.name}
                </div>
                <div className="flex-1 w-[16%] text-sm  border-gray-200 px-4 py-2 text-left">
                  {e.category}
                </div>
                <div className="flex-1 w-[16%] text-sm  border-gray-200 px-4 py-2 text-left">
                  ${e.price}
                </div>
                <div className="flex-1 w-[16%] px-4 py-2 text-left text-xl text-gray-500">
                  <Delete onClick={()=>DeleteItems(e._id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Delete = ({onClick}) => {
  return (
    <>
      <button onClick={onClick} className="px-5 py-1 text-white font-bold rounded-lg text-sm bg-gray-700 flex items-center text-center hover:opacity-80">
        Delete
      </button>
    </>
  );
};

Delete.propTypes = {
  onClick : PropTypes.func.isRequired
}
export default ListItems;
