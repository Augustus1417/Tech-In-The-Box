import React from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

export default function OrderCard({ order, onCancel }) {
  const cancelOrder = async () => {
    try {
      await axios.patch(`${config.API_URL}/api/orders/cancel/${order.order_id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(`Order ${order.order_id} cancelled.`);
      onCancel(order.order_id);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to cancel order");
    }
  };

  return (
    <div className="bg-white text-black shadow-md p-6 rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">Order #{order.order_id}</h2>
          <p className="text-sm text-gray-600">Status: {order.status}</p>
          <p className="text-sm text-gray-600">Placed: {new Date(order.order_date).toLocaleString()}</p>
          {order.delivery_date && (
            <p className="text-sm text-gray-600">Delivery: {new Date(order.delivery_date).toLocaleString()}</p>
          )}
          <p className="text-sm text-gray-600">Total: ₱{order.total_price}</p>
        </div>

        {/* Hide cancel button if the order is delivered or cancelled */}
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <button
            onClick={cancelOrder}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="space-y-2">
        {order.order_items.map((item) => (
          <div key={item.order_item_id} className="flex items-center gap-4">
            <img
              src={item.product.imgURL || "/placeholder.jpg"}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="text-sm">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-gray-600">₱{item.product.price} × {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
