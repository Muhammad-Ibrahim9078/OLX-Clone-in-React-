import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/olx-logo.png";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const naviagate = useNavigate()


function loginBtn(e) {
  e.preventDefault();

  // Show loader
  Swal.fire({
    title: "Loading...",
    html: "Please wait while we process your request.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(); // Loader start
    },
  });

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Success -> loader close
      Swal.close();
      const user = userCredential.user;
      console.log(user);
      naviagate("/dashboard");
    })
    .catch((error) => {
      // Error -> loader close + error alert
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Does not match.",
      });
      console.log(error.message);
    });
}



  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <img src={logo} alt="OLX" className="mx-auto h-16 mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={loginBtn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={loginBtn}>
            Login
          </button>
          <p className="text-center text-sm mt-2">
            Don't have an account
            <Link to={'/signup'} className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default Login