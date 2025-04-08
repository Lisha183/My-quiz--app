

import { useState } from "react";
import { auth } from "/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const login = ({ setUser, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isNewUser, setIsNewUser] = useState(false);

  console.log("Rendering Login Component"); // Check if this appears in the console

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
      setUserRole(role);
    } catch (error) {
      console.error("Error during authentication", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
       <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Left side: Welcome message */}
        <div className="hidden lg:block w-1/2 bg-blue-500 text-white p-8">
          <h2 className="text-4xl font-semibold">Welcome Back!</h2>
          <p className="mt-4 text-lg">Please log in to continue to your dashboard.</p>
        </div>

        <div className="w-full lg:w-1/2 p-8">
      <h2  className="text-3xl font-bold mb-4">{isNewUser ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="employer">Instructor</option>
          </select>
        </div>
        <button type="submit">{isNewUser ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isNewUser ? "Already have an account?" : "New user?"}{" "}
        <button onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? "Login" : "Sign Up"}
        </button>
      </p>
      </div>
    </div>
    </div>
  );
};

export default login;
