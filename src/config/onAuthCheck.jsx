import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function onAuthCheck() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("login"); // default login page

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Dashboard />;
  } else {
    return (
      <div>
        {page === "login" ? (
          <Login switchPage={() => setPage("signup")} />
        ) : (
          <Signup switchPage={() => setPage("login")} />
        )}
      </div>
    );
  }
}

export default onAuthCheck;
