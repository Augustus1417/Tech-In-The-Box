import React from 'react';
import { Trash, ShieldPlus, ShieldOff } from "lucide-react";

const UsersTable = ({ users, handleDeleteUser, handleGrantAdmin, handleRevokeAdmin }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b whitespace-nowrap">ID</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Name</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Email</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Role</th>
              <th className="px-4 py-2 border-b whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b whitespace-nowrap">{user.user_id}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{user.role}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleGrantAdmin(user.user_id)}
                        className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-500"
                        title="Grant Admin"
                      >
                        <ShieldPlus size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRevokeAdmin(user.user_id)}
                        className="bg-yellow-600 text-white p-2 rounded-md hover:bg-yellow-500"
                        title="Revoke Admin"
                      >
                        <ShieldOff size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.user_id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                      title="Delete User"
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
    </div>
  );
};

export default UsersTable;
