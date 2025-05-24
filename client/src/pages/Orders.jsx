import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import OrderCard from "../components/OrderCard";
import { ToastContainer, toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all"); 

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/orders/user/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.orders);
      setFilteredOrders(res.data.orders); 
    } catch (err) {
        console.debug(err)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.order_id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);

    if (status === "all") {
      setFilteredOrders(orders); 
    } else {
      setFilteredOrders(orders.filter(order => order.status === status)); 
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white text-black shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl m-6 sm:m-10 lg:m-20 mt-24">
      <ToastContainer position="bottom-right" />
      <h1 className="text-4xl font-bold mb-8">Your Orders</h1>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="statusFilter" className="mr-4 font-semibold">Filter by Status:</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found for the selected status.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.order_id} order={order} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
}
