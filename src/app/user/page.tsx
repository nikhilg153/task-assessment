"use client";

import React, { useState, useEffect } from "react";
import { AuthService, User } from "@/services/authService";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="text-xl">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
