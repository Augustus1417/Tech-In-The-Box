import React, {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";

const CartList = forwardRef((props, ref) => {
  const [cartData, setCartData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCartData = useCallback(() => {
    axios
      .get(`${config.API_URL}/api/cart/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCartData(res.data))
      .catch((err) => console.error("Error loading cart data:", err));
  }, [token]);

  useImperativeHandle(ref, () => ({
    refetch: fetchCartData,
  }));

  const handleDelete = async (cartId) => {
    try {
      await axios.delete(`${config.API_URL}/api/cart/delete/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item deleted");
      fetchCartData();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <div className="grid gap-4 m-10 mt-4">
      <ToastContainer position="bottom-right" />
      {cartData.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        cartData.map((item) => (
          <div
            key={item.cart_id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-2xl p-4 shadow-md gap-4"
          >
            {/* Image section */}
            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm shrink-0">
              IMG
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <h2 className="text-lg font-bold text-gray-800">{item.product_name}</h2>
              <p className="text-sm text-gray-600">
                Price: ₱{item.product_price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Total: ₱{(item.product_price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Delete icon */}
            <button
              onClick={() => handleDelete(item.cart_id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        ))
      )}
    </div>
  );
});

export default CartList;
