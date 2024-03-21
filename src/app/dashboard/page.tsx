"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center mt-10 space-x-10">
      <button
        onClick={() => router.push("/product")}
        className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
      >
        Product List
      </button>
      <button
        onClick={() => router.push("/user")}
        className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
      >
        User List
      </button>
    </div>
  );
};

export default AdminPanel;
