// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductForm from './ProductForm';
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/products', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setProducts(response.data.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error.response.data.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/products/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       fetchProducts();
//     } catch (error) {
//       console.error('Failed to delete product:', error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>Products</h2>
//       <button className="btn btn-success mb-3" onClick={() => setSelectedProduct({})}>
//         Add Product
//       </button>
//       {selectedProduct && (
//         <ProductForm 
//           product={selectedProduct} 
//           onClose={() => setSelectedProduct(null)} 
//           onSuccess={() => {
//             fetchProducts();
//             setSelectedProduct(null); // Reset selected product after submission
//           }} 
//         />
//       )}
//       <ul className="list-group">
//         {products.map((product) => (
//           <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
//             {product.name} - Rs.{product.price} - {product.description}
//             <div>
//               <button className="btn btn-info btn-sm mr-2" onClick={() => setSelectedProduct(product)}>Edit</button>
//               <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Pencil, Plus, LogOut } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error.response?.data?.message || error.message);
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    fetchProducts();
    handleFormClose();
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container-fluid px-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Start Bootstrap</a>
        <div className="navbar-nav ml-auto">
          <a className="nav-item nav-link" href="#">Home</a>
          <a className="nav-item nav-link" href="#">About</a>
          <a className="nav-item nav-link" href="#">Shop</a>
          <a className="nav-item nav-link" href="#"><i className="bi bi-cart"></i> <span className="badge bg-dark text-white ms-1 rounded-pill">0</span></a>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5 mt-5">
        <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Add New Product
        </button>

        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((product) => (
            <div className="col mb-5" key={product.id}>
              <div className="card h-100">
                {product.salePrice && <div className="badge bg-dark text-white position-absolute" style={{top: '0.5rem', right: '0.5rem'}}>Sale</div>}
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{product.name}</h5>
                    {product.rating && (
                      <div className="d-flex justify-content-center small text-warning mb-2">
                        {[...Array(product.rating)].map((_, i) => (
                          <div className="bi-star-fill" key={i}></div>
                        ))}
                      </div>
                    )}
                    {product.salePrice ? (
                      <span>
                        <span className="text-muted text-decoration-line-through">${product.price}</span>
                        ${product.salePrice}
                      </span>
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button className="btn btn-outline-dark mt-auto" onClick={() => handleEdit(product)}>
                      <Pencil size={16} /> Edit
                    </button>
                    <button className="btn btn-outline-danger mt-auto ml-2" onClick={() => handleDelete(product.id)}>
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ProductList;
