import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Item(){
  const {id} = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1)
  const token = localStorage.getItem('token');

  const fetchItem = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/products/get/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const increment = () => {
    if (quantity == item.stock){
      return
    }
    setQuantity(quantity + 1)
  }
  
  const decrement = () => {
    if (quantity == 1){
      return
    }
    setQuantity(quantity - 1)
  }

  useEffect(() => {
    fetchItem();
  }, []);

  const addToCart = (product_id, quantity) => {
    if (item.stock === 0) {
      toast.error("This item is out of stock.");
      return;
    }

    axios.post(`${config.API_URL}/api/cart/`,
      { product_id: product_id, quantity: quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      toast.success("Item added to cart!");
    }).catch(err => {
      console.error(err);
      toast.error("Failed to add to cart.");
    });
  };

    return(
        <>
        <div className="flex flex-col lg:flex-row shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl m-6 sm:m-10 lg:m-20 mt-25 lg:mt-20 space-y-6 lg:space-x-6 lg:space-y-0">
          <ToastContainer position="bottom-right"/>
          <div className="flex flex-col w-full sm:w-80 md:w-90 lg:w-100">
            <img className="border-2 border-black rounded-xl w-full h-full object-cover mb-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s" alt={item.name} />
          </div>
          <div className="flex flex-col w-full sm:w-80 md:w-90 lg:w-200">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{item.name}</h2>
            <p className="text-base sm:text-lg text-black mb-6">{item.description}</p>
            <p className="text-lg sm:text-xl text-green-600 font-bold mb-2">₱{item.price}</p>
            <p className="text-base sm:text-lg text-gray-500 mb-6">Stock: {item.stock}</p>
            <div className="mb-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
              <div className="flex items-center bg-gray-300 rounded-xl overflow-hidden w-fit">
                <button onClick={decrement} className="text-lg px-4 py-2 hover:bg-gray-400"> - </button>
                <span className="px-4 py-2 text-lg bg-gray-100">{quantity}</span>
                <button onClick={increment} className="text-lg px-4 py-2 hover:bg-gray-400"> + </button>
              </div>
              <button onClick={() => {addToCart(item.product_id, quantity)}} className=' bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-lg  text-white font-bold py-2 px-4 w-full sm:w-1/2 mt-4 sm:mt-0 focus:outline-none dark:focus:ring-yellow-800"'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        </>
    );
}