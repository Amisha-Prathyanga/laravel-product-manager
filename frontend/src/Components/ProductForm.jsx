// import React, { useState, useEffect } from "react";
// import { addProduct, editProduct } from "../api";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";

// const ProductForm = ({ product, onClose, onSuccess }) => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     if (product) {
//       setName(product.name);
//       setPrice(product.price);
//       setDescription(product.description);
//       setPreviewImage(product.image);
//     }
//   }, [product]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Processing...",
//       html: "Please wait...",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("price", price);
//       formData.append("description", description);
//       if (image) {
//         formData.append("image", image);
//       }

//       if (product && product.id) {
//         await editProduct(product.id, formData);
//         await Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Product updated successfully",
//           timer: 1500,
//         });
//       } else {
//         await addProduct(formData);
//         await Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Product created successfully",
//           timer: 1500,
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Product operation failed:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: `Failed to ${product ? "update" : "create"} product: ${
//           error.response?.data?.message || error.message
//         }`,
//       });
//     }
//   };

//   return (
//     <div
//       className="modal"
//       style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               {product ? "Edit Product" : "Add New Product"}
//             </h5>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit}>
//               <div className="form-group mb-3">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Price</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   step="0.01"
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Description</label>
//                 <textarea
//                   className="form-control"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group mb-3">
//                 <label>Image</label>
//                 <input
//                   type="file"
//                   className="form-control-file"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                 />
//               </div>
//               {previewImage && (
//                 <div className="form-group mb-3">
//                   <label>Image Preview</label>
//                   <div
//                     className="border rounded p-2"
//                     style={{ textAlign: "center" }}
//                   >
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       style={{
//                         maxWidth: "100%",
//                         maxHeight: "200px",
//                         borderRadius: "5px",
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}
//               <div className="d-flex justify-content-between mt-4">
//                 <button type="submit" className="btn btn-primary">
//                   {product ? "Update" : "Create"} Product
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useState, useEffect } from "react";
import { editProduct } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { addProduct } from "../services/productService";

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      if (product && product.id) {
        await editProduct(product.id, formData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated successfully",
          timer: 1500,
        });
      } else {
        await addProduct(formData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product created successfully",
          timer: 1500,
        });
      }

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
    } finally {
      setLoading(false);
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
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
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
              <div className="form-group mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              {previewImage && (
                <div className="form-group mb-3">
                  <label>Image Preview</label>
                  <div
                    className="border rounded p-2"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : (product ? "Update" : "Create") + " Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
