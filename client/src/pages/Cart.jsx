import React, { useState, useEffect, useRef } from "react";
import CartList from "../components/CartList";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const cartRef = useRef();

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/addresses/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddressList(res.data.addresses);
      if (res.data.addresses.length > 0) {
        setSelectedAddress(res.data.addresses[0].address);
      }
    } catch (err) {
      setAddressList([]);
    }
  };

  const handleOrder = async () => {
    if (!selectedAddress.trim()) {
      toast.error("Please select an address.");
      return;
    }

    try {
      await axios.post(
        `${config.API_URL}/api/orders/`,
        { address: selectedAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Order placed successfully!");
      setSelectedAddress("");

      if (cartRef.current) {
        cartRef.current.refetch(); 
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to place order.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white text-black shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl m-6 sm:m-10 lg:m-20 mt-24">
      <ToastContainer position="bottom-right" />
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      <CartList ref={cartRef} />

      <p className="text-gray-600 mb-4">You can manage your addresses in the Account tab</p>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="flex-grow px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select your address</option>
          {addressList.map((addr, idx) => (
            <option key={idx} value={addr.address}>
              {addr.address}
            </option>
          ))}
        </select>
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          Order now
        </button>
      </div>
    </div>
  );

}
