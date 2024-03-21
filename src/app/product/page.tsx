"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
  });
  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductData, setUpdateProductData] = useState({
    name: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("https://dummyjson.com/products/add", newProduct);
      fetchProducts();
      setNewProduct({ title: "", category: "", price: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `https://dummyjson.com/products/${updateProductId}`,
        updateProductData
      );
      fetchProducts();
      setUpdateProductId("");
      setUpdateProductData({ name: "", category: "", price: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateInputChange = (e: any) => {
    const { name, value } = e.target;
    setUpdateProductData({ ...updateProductData, [name]: value });
  };

  return (
    <div className="m-4 flex flex-col space-y-5">
      <div>
        <h2 className="text-center text-2xl font-medium">Dashboard</h2>
        <h3 className="text-lg font-medium">Add Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          className="p-2 border border-amber-800 rounded-md mr-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="p-2 border border-amber-800 rounded-md mr-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="p-2 border border-amber-800 rounded-md mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium">Update Product</h3>
        <select
          onChange={(e) => setUpdateProductId(e.target.value)}
          className="p-2 border border-amber-800 rounded-md mb-2"
        >
          <option value="">Select Product</option>
          {products.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>
        {updateProductId && (
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={updateProductData.name}
              onChange={handleUpdateInputChange}
              className="p-2 border border-amber-800 rounded-md mr-2"
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={updateProductData.category}
              onChange={handleUpdateInputChange}
              className="p-2 border border-amber-800 rounded-md mr-2"
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={updateProductData.price}
              onChange={handleUpdateInputChange}
              className="p-2 border border-amber-800 rounded-md mr-2"
            />
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        )}
      </div>

      <h3 className="text-3xl font-medium text-center">Product List</h3>
      <table>
        <thead>
          <tr className="text-left">
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>
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

export default ProductListPage;
