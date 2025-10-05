import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/olx-logo.png";
import { useState } from "react";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Swal from "sweetalert2";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naviagate = useNavigate()

   function signUpBtn(e) {
    e.preventDefault();

    // Loader show
    Swal.fire({
      title: "Creating account...",
      html: "Please wait while we register your account.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.close(); // loader band

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        const user = userCredential.user;
        console.log(user);
        naviagate("/dashboard");
      })
      .catch(() => {
        Swal.close(); // loader band

        // Custom error alert (Firebase ka msg nahi)
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: "Something went wrong! Please try again.",
        });
      });
  }


  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-yellow-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <img src={logo} alt="OLX" className="mx-auto h-16 mb-4" />
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={signUpBtn} className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >
            Signup
          </button>
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-yellow-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
