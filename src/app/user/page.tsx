"use client";

import React, { useState, useEffect } from "react";
import { AuthService, User } from "@/services/authService";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<{
    newUsername: string;
    newPassword: string;
  }>({ newUsername: "", newPassword: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await AuthService.getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await AuthService.addUser({
        username: newUser.newUsername,
        password: newUser.newPassword,
      });
      setNewUser({ newUsername: "", newPassword: "" });
      const updatedUsers = await AuthService.getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (username: string) => {
    try {
      await AuthService.deleteUser(username);
      const updatedUsers = await AuthService.getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className=" flex flex-col m-4 items-center justify-center">
      <div className="my-5">
        <input
          type="text"
          placeholder="Username"
          value={newUser.newUsername}
          onChange={(e) =>
            setNewUser({ ...newUser, newUsername: e.target.value })
          }
          className="p-2 border border-amber-800 rounded-md mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.newPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, newPassword: e.target.value })
          }
          className="p-2 border border-amber-800 rounded-md mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      <table>
        <thead>
          <tr className="text-left">
            <th>Username</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>

              <td>
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
