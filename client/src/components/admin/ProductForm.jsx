import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';

const ProductForm = ({ productId, onClose, setProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    if (productId) {
      axios
        .get(`${config.API_URL}/api/products/get/${productId}`)
        .then((response) => {
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setStock(product.stock);
          setImgURL(product.imgURL);
        })
        .catch(() => toast.error('Failed to fetch product details', {position: 'bottom-right'}));
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      imgURL,
    };

    try {
      if (productId) {
        
        await axios.patch(`${config.API_URL}/api/products/update/${productId}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('Product updated successfully', {position: 'bottom-right'});
      } else {
        
        await axios.post(`${config.API_URL}/api/products`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('Product created successfully', {position: 'bottom-right'});

      }

      
      const res = await axios.get(`${config.API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(res.data);
      onClose(); 
    } catch (error) {
      toast.error('Failed to submit product', {position: 'bottom-right'});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{productId ? 'Edit Product' : 'Create Product'}</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={imgURL}
          onChange={(e) => setImgURL(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded mr-5">Submit</button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-600 text-white p-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
