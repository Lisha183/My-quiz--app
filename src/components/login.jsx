import { useState } from "react";
import { auth } from "/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setUser, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await addDoc(collection(db, "users"), {
            uid: userCredential.user.uid,
            name: name,
            email: email,
            role: role,
            createdAt: new Date().toISOString()
          });

          setUserRole(role);
          setUser(userCredential.user);
          navigate(`/${role}s`);

      } else {

        userCredential = await signInWithEmailAndPassword(auth, email, password);


        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", userCredential.user.uid));
        const querySnapshot = await getDocs(q);
      }
   
    if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserRole(userData.role);
        setUser(userCredential.user);
        navigate(`/${userData.role}s`); 
      } else {
        console.error("No user data found");
        setUserRole(""); 
      }
    
    } catch (error) {
      console.error("Error during authentication", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{isNewUser ? "Sign Up" : "Login"}</h2>
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
            <option value="employee">User</option>
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
  );
};
export default Login;
