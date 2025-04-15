import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "/config/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";



const SignUp = ({ setUser, setUserRole }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setError("This email is already registered.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });
  

      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
 
        name: name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      setUser(userCredential.user);
      setUserRole(role);


      if (role === "admin") {
        navigate("/admin");
      } else if (role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="  bg-gradient-to-r from-[#003366] via-[#6A0DAD] via-[#FF69B4] to-[#A7C7E7] min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden min-h-[500px]">
        <div className="block w-1/2  bg-cover bg-center text-white p-8"
        style={{
            backgroundImage: "url('scene.jpg')", 
          }}
        >
           <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-semibold text-center">Join Us!</h2>
          <p className="mt-4 text-lg text-center">Create an account to get started</p>
        </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block mb-1">Full Name:</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
              <label className="block mb-1">Role:</label>
              <select
                className="w-full border px-4 py-2 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="instructor">Instructor</option>
                
              </select>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600" type="submit">
              Sign Up
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
