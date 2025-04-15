import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


const Login = ({ setUser, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const role = userData.role;

        setUser(user);
        setUserRole(role);
        console.log("Login: User role fetched:", role); 


        if (role === "admin") {
          navigate("/admin");
        } else if (role === "instructor") {
          navigate("/instructor");
        } else if (role === "user") {
          navigate("/user");
        } else {
          navigate("/login");
        }
      } else {
        console.error("No user data found");
        setUserRole("");
        setError("User data not found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <div className=" bg-gradient-to-r from-[#003366] via-[#6A0DAD] via-[#FF69B4] to-[#A7C7E7] min-h-screen flex items-center justify-center ">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        <div className="lg:block w-1/2 bg-cover bg-center text-white p-8"
        style={{
            backgroundImage: "url('scene.jpg')", 
          }}
        >
            <div className="flex flex-col items-center justify-center h-full">
          <h2 className=" text-4xl font-semibold text-center">Welcome Back!</h2>
          <p className="mt-4 text-lg text-center">Log in to your dashboard</p>
        </div>
        </div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                className="w-full border px-4 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                className="w-full border px-4 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-[#4682B4] hover:text-[#4682B4]/80">
                Sign up
              </a>
            </p>
          </div>
          <br />
         
        </div>
      </div>
    </div>
  );
};

export default Login;
