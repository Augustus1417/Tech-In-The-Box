import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import OrdersTable from "../components/admin/OrdersTable";
import UsersTable from "../components/admin/UsersTable";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [grantingAdmin, setGrantingAdmin] = useState(false);  

  const fetchData = async (endpoint, setter) => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.API_URL}/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setter(res.data.users || res.data.orders || res.data);
    } catch (err) {
      toast.error(`Failed to load ${endpoint}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "products") {
      fetchData("products", setProducts);
    } else if (activeTab === "orders") {
      fetchData("orders", setOrders);
    } else if (activeTab === "users") {
      fetchData("users", setUsers);
    }
  }, [activeTab]);

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setIsFormOpen(true);
  };

  const handleCreateProduct = () => {
    setEditingProductId(null);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${config.API_URL}/api/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success('Product deleted successfully');
      setProducts((prev) => prev.filter(product => product.product_id !== productId));
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${config.API_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success('User deleted successfully');
      setUsers((prev) => prev.filter(user => user.user_id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleGrantAdmin = async (userId) => {
    setGrantingAdmin(true);  
    try {
      await axios.patch(`${config.API_URL}/api/users/grant/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Admin privileges granted!");
      
      fetchData("users", setUsers);
    } catch (error) {
      toast.error("Failed to grant admin privileges");
    } finally {
      setGrantingAdmin(false);  
    }
  };

  const handleRevokeAdmin = async (userId) => {
    try {
      await axios.patch(`${config.API_URL}/api/users/revoke/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Admin privileges revoked!");
      fetchData("users", setUsers);
    } catch (error) {
      toast.error("Failed to revoke admin privileges");
    }
  };

  return (
    <div className="bg-white text-black shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl m-6 sm:m-10 lg:m-20 mt-24">
      <ToastContainer position='bottom-right'/>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-10">
        <div className="flex gap-4 mb-4">
          {["products", "orders", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-white transition ${
                activeTab === tab
                  ? "bg-blue-600"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <>
            {isFormOpen && (
              <ProductForm
                productId={editingProductId}
                onClose={() => setIsFormOpen(false)}
                setProducts={setProducts}
              />
            )}

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <ProductTable
                products={products}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            )}

            <button
              onClick={handleCreateProduct}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Create New Product
            </button>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <OrdersTable orders={orders} setOrders={setOrders} />
          )
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <UsersTable
              users={users}
              handleDeleteUser={handleDeleteUser}
              handleGrantAdmin={handleGrantAdmin}
              grantingAdmin={grantingAdmin}  
              handleRevokeAdmin={handleRevokeAdmin}
            />
          )
        )}
      </section>
    </div>
  );
}
