// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const ProductForm = ({ product, onClose, onSuccess }) => {
//   const [name, setName] = useState(product ? product.name : "");
//   const [price, setPrice] = useState(product ? product.price : "");
//   const [description, setDescription] = useState(
//     product ? product.description : ""
//   );

//   useEffect(() => {
//     if (product) {
//       setName(product.name);
//       setPrice(product.price);
//       setDescription(product.description);
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (product && product.id) {
//         // Update product
//         await axios.put(
//           `http://localhost:8000/api/products/${product.id}`,
//           {
//             name,
//             price,
//             description,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       } else {
//         // Create new product
//         await axios.post(
//           "http://localhost:8000/api/products",
//           {
//             name,
//             price,
//             description,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//       }
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Product operation failed:", error.response.data.message);
//     }
//   };

//   return (
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">{product ? "Edit Product" : "Add Product"}</h5>
//         <button type="button" className="close" onClick={onClose}>
//           <span>&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Price</label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               className="form-control"
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             {product ? "Update" : "Create"}
//           </button>
//           <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [salePrice, setSalePrice] = useState(product ? product.salePrice : "");
  const [rating, setRating] = useState(product ? product.rating : 0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setSalePrice(product.salePrice || "");
      setRating(product.rating || 0);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        price,
        description,
        salePrice: salePrice || null,
        rating: rating || null,
      };

      if (product && product.id) {
        await axios.put(`http://localhost:8000/api/products/${product.id}`, productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.post("http://localhost:8000/api/products", productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Product operation failed:", error.response.data.message);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? "Edit Product" : "Add Product"}</h5>
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
                />
              </div>
              <div className="form-group">
                <label>Sale Price (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Rating (0-5)</label>
                <input
                  type="number"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(Math.min(5, Math.max(0, parseInt(e.target.value) || 0)))}
                  min="0"
                  max="5"
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
              <button type="submit" className="btn btn-primary">
                {product ? "Update" : "Create"}
              </button>
              <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
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
