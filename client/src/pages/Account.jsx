import React, { useContext, useEffect, useState } from 'react';
import config from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import { Trash2 } from 'lucide-react'; 

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const token = localStorage.getItem('token');
  const { setIsAuthenticated, logout } = useContext(UserContext);

  const verifyToken = async () => {
    try {
      await axios.get(`${config.API_URL}/api/auth/verify_token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      console.debug('User info cannot be fetched');
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/api/addresses/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data.addresses);
    } catch {
      setAddresses([]);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      toast.error("Address can't be empty");
      return;
    }

    try {
      await axios.post(
        `${config.API_URL}/api/addresses/`,
        { address: newAddress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Address added successfully");
      setNewAddress('');
      fetchAddresses(); 
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  const handleDeleteAddress = async (address_id) => {
    try {
      await axios.delete(`${config.API_URL}/api/addresses/delete/${address_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Address deleted");
      fetchAddresses(); 
    } catch {
      toast.error("Failed to delete address", { position: 'bottom-right' });
    }
  };

  useEffect(() => {
    verifyToken();
    getUserInfo();
    fetchAddresses();
  }, []);

  return (
    <div className="bg-white text-black shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl m-6 sm:m-10 lg:m-20 mt-24">
      <ToastContainer position='bottom-right'/>
      <h1 className="text-4xl font-bold mb-8">Account</h1>

      <section className="mb-10">
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm space-y-2">
          <p className="text-xl"><span className="font-semibold">Name:</span> {user.name}</p>
          <p className="text-xl"><span className="font-semibold">Email:</span> {user.email}</p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Log out
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Addresses</h2>

        {addresses.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {addresses.map((addr) => (
              <li key={addr.address_id} className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm">
                <span className="text-gray-800">{addr.address}</span>
                <button
                  onClick={() => handleDeleteAddress(addr.address_id)}
                  className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mb-6">You have no saved addresses.</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="text"
            placeholder="Add new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Add Address
          </button>
        </div>
      </section>
    </div>
  );

}
