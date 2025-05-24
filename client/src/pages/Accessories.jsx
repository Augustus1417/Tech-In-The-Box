import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import config from "../config";

export default function Accessories() {
 
  const [accessories, setAccessories] = useState([]);

  const fetchAccessories = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/products/accessories`);
      setAccessories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <>
    <h1 className='text-center m-10 mt-30 text-4xl font-bold'>Accessories</h1>
    <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700 mx-auto w-2/3" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {accessories.map((accessory) => (
        <Card 
          product_id={accessory.product_id} 
          name={accessory.name} 
          description={accessory.description}
          price={accessory.price}
          stock={accessory.stock}
        />
      ))}
    </div>
    </>
  )
}