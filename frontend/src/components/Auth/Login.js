

// // export default Login;
// import React from "react";
// import "./Login.css";
// import Navbar from "../Navbar";
// const Login = () => {
//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-illustration">
//           <img
//             src="https://i.pinimg.com/736x/fb/07/f8/fb07f8ec88df036b49a2b96402af090e.jpg" // Replace with your illustration URL
//             alt="Illustration"
//             className="illustration-image"
//           />
//         </div>
//         <div className="login-form">
//           <h2>Sign In</h2>
//           <p>Unlock your world.</p>
//           <form>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               required
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               required
//             />
//             <button type="submit" className="btn-primary">
//               Sign In
//             </button>
//           </form>
//           <button className="btn-secondary">Create an account</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory for redirection
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory(); // Initialize useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: email, // Assuming you use 'username' for login
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Store token for authentication
      history.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: email,
        password,
      });
      console.log("Signup successful:", response.data);
      // Optionally, redirect to login or directly to dashboard
      history.push("/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-illustration">
          <img
            src="https://i.pinimg.com/736x/fb/07/f8/fb07f8ec88df036b49a2b96402af090e.jpg" // Replace with your illustration URL
            alt="Illustration"
            className="illustration-image"
          />
        </div>
        <div className="login-form">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Sign In
            </button>
          </form>
          <button className="btn-secondary" onClick={handleSignup}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
