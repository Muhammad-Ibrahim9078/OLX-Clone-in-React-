// // src/components/OnAuthState.jsx
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase";
// import { useNavigate } from "react-router-dom";

// function OnAuthState() {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/dashboard"); // user logged in
//       } else {
//         navigate("/"); // user logged out -> login page
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-gray-600">
//           Checking authentication...
//         </p>
//       </div>
//     );
//   }

//   return null;
// }

// export default OnAuthState;
