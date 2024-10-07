// import React from "react";
// import { LogOut } from "lucide-react";

// const Header = ({ onLogout }) => (
//   <header className="bg-dark vw-100">
//     <div className="container-fluid py-5">
//       {/* Logout Button */}
//       <div className="position-absolute top-0 end-0 p-4">
//         <button
//           className="btn btn-secondary"
//           onClick={onLogout}
//           style={{
//             transition: "all 0.2s ease",
//             borderRadius: "6px",
//           }}
//         >
//           <LogOut size={16} className="me-2" /> Logout
//         </button>
//       </div>

//       {/* Header Content */}
//       <div className="text-center text-white">
//         <h1 className="display-4 fw-bolder mb-3">
//           Breadcrumbs Product Catalogue
//         </h1>
//         <p className="lead fw-normal text-white-50 mb-0">Shop as you wish</p>
//       </div>
//     </div>
//   </header>
// );

// // Add these styles to your CSS file
// const styles = `
//   /* Add hover effect for logout button */
//   .btn-outline-light:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//   }
// `;

// export default Header;


import React from "react";
import { LogOut, ShoppingBag, Sparkles } from "lucide-react";

const Header = ({ onLogout }) => (
  <header className="futuristic-header position-relative overflow-hidden bg-dark vw-100">
    {/* Animated background elements */}
    <div className="cyber-grid"></div>
    
    <div className="container-fluid py-5 position-relative">
      {/* Logout Button */}
      <div className="position-absolute top-0 end-0 p-4 mx-2">
        <button
          className="btn btn-secondary"
          onClick={onLogout}
        >
          <LogOut size={16} className="me-2" /> Logout
        </button>
      </div>

      {/* Header Content */}
      <div className="text-center text-white position-relative">
        <div className="neon-circle"></div>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <ShoppingBag className="text-primary me-3" size={40} />
          <h1 className="display-4 fw-bolder mb-0 cyber-text">
            Breadcrumbs
          </h1>
        </div>
        <h2 className="h2 fw-light text-primary mb-3 cyber-subtext">
          Product Catalogue
        </h2>
        <p className="lead fw-normal text-white-50 mb-0 d-flex align-items-center justify-content-center">
          <Sparkles size={16} className="text-primary me-2" />
          Shop as you wish
          <Sparkles size={16} className="text-primary ms-2" />
        </p>
      </div>
    </div>
  </header>
);

// Add these styles to your CSS file
const styles = `
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 0.7; }
  100% { opacity: 0.4; }
}

.futuristic-header {
  background: linear-gradient(45deg, #1a1a1a, #2c3e50, #1a1a1a);
  background-size: 200% 200%;
  animation: gradientBG 15s ease infinite;
  border-bottom: 2px solid rgba(13, 110, 253, 0.5);
}

.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(13, 110, 253, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13, 110, 253, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.neon-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 3s ease-in-out infinite;
}

.cyber-text {
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(45deg, #fff, #e6e6e6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 10px rgba(255,255,255,0.2);
  position: relative;
}

.cyber-subtext {
  letter-spacing: 5px;
  text-transform: uppercase;
  animation: float 3s ease-in-out infinite;
}

.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
  color: white;
}

/* Add subtle glow to icons */
.text-primary {
  filter: drop-shadow(0 0 5px rgba(13, 110, 253, 0.5));
}

/* Add scan line effect */
.futuristic-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
`;

export default Header;