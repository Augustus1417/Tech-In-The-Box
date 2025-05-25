import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { Pencil, Trash } from "lucide-react";

const OrdersTable = ({ orders, setOrders }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleShipOrder = async (orderId) => {
    setLoadingId(orderId);
    try {
      const response = await axios.patch(`${config.API_URL}/api/orders/shipped/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId ? { ...order, status: 'shipped' } : order
          )
        );
        toast.success(`Order ${orderId} has been shipped.`);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error("Error while shipping order:", err.response || err);
      toast.error(err.response?.data?.detail || "Error shipping order.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    setLoadingId(orderId);
    try {
      const response = await axios.patch(`${config.API_URL}/api/orders/delivered/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId
              ? { ...order, status: 'delivered', delivery_date: new Date() }
              : order
          )
        );
        toast.success(`Order ${orderId} has been delivered.`);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error("Error while delivering order:", err.response || err);
      toast.error(err.response?.data?.detail || "Error delivering order.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    setLoadingId(orderId);
    try {
      const response = await axios.delete(`${config.API_URL}/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 204) {
        setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
        toast.success(`Order ${orderId} has been deleted.`);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error("Error while deleting order:", err.response || err);
      toast.error(err.response?.data?.detail || "Error deleting order.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm overflow-auto">
      <ToastContainer position="bottom-right" />
      <div className="mb-4 flex items-center gap-2">
        <label className="font-medium">Filter by status:</label>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b whitespace-nowrap">Order ID</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Name</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Total Price</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Status</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Order Date</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Delivery Date</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Address</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Items</th>
                <th className="px-4 py-2 border-b whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.order_id}>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{order.order_id}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{order.user_name}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{order.total_price}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{order.status}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    {new Date(order.order_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    {order.delivery_date ? new Date(order.delivery_date).toLocaleString() : 'Not Delivered'}
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{order.address}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    <ul>
                      {order.order_items.map((item) => (
                        <li key={item.order_item_id}>
                          {item.product.name} x{item.quantity} - {item.order_price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleShipOrder(order.order_id)}
                          disabled={loadingId === order.order_id}
                          className={`px-3 py-1 rounded-md text-white ${
                            loadingId === order.order_id
                              ? 'bg-green-400 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          Ship
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => handleDeliverOrder(order.order_id)}
                          disabled={loadingId === order.order_id}
                          className={`px-3 py-1 rounded-md text-white ${
                            loadingId === order.order_id
                              ? 'bg-blue-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          Deliver
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(order.order_id)}
                        disabled={loadingId === order.order_id}
                        className={`p-2 rounded-md text-white ${
                          loadingId === order.order_id
                            ? 'bg-red-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
