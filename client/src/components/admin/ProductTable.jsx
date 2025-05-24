import React, { useState } from 'react';
import { Pencil, Trash } from "lucide-react";

const ProductTable = ({ products, handleEditProduct, handleDeleteProduct }) => {
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter((product) => product.category === categoryFilter);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm overflow-auto">
      <div className="mb-4 flex items-center gap-2">
        <label className="font-medium">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="phone">Phone</option>
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b whitespace-nowrap">ID</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Name</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Price</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Stock</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Category</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b whitespace-nowrap">{product.product_id}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{product.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{product.price}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{product.stock}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap capitalize">{product.category}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditProduct(product.product_id)}
                      className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.product_id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No products found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
