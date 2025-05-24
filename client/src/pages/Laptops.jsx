import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import config from "../config";

export default function Laptops() {

  const [laptops, setLaptops] = useState([]);

  const fetchLaptops = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/products/laptops`);
      setLaptops(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  return (
    <>
    <h1 className='text-center m-10 mt-30 text-4xl font-bold'>Laptops</h1>
    <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700 mx-auto w-2/3" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {laptops.map((laptop) => (
        <Card 
          product_id={laptop.product_id} 
          name={laptop.name} 
          description={laptop.description}
          price={laptop.price}
          stock={laptop.stock}
        />
      ))}
    </div>
    </>
  )
}