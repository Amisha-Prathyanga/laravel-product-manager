import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setPreviewImage(product.image);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state
    Swal.fire({
      title: "Processing...",
      html: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      console.log("Product ID:", product?.id);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let response; // Declare a variable to hold the response

      if (product && product.id) {
        // Update existing product
        response = await axios.put(
          `http://localhost:8000/api/products/${product.id}`,
          formData,
          config
        );
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated successfully",
          timer: 1500,
        });
      } else {
        // Create new product
        response = await axios.post(
          "http://localhost:8000/api/products",
          formData,
          config
        );
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product created successfully",
          timer: 1500,
        });
      }

      console.log("Server response:", response.data); // Now response is defined
      onSuccess();
    } catch (error) {
      console.error("Product operation failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to ${product ? "update" : "create"} product: ${
          error.response?.data?.message || error.message
        }`,
      });
    }
  };

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {product ? "Edit Product" : "Add New Product"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              {previewImage && (
                <div className="form-group">
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                {product ? "Update" : "Create"} Product
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
