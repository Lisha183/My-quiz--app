 
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ManageUsers from "./components/ManageUsers";
import ManageQuizzes from "./components/ManageQuizzes";
import Categories from "./components/Categories";
import AdminDashboard from './components/AdminDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import UserDashboard from './components/UserDashboard';
import Login from "./components/Login";
import Signup from "./components/signUp";
import QuizForm from "./components/QuizForm";
import QuizzesPage from "./components/QuizzesPage";
import QuizList from "./components/QuizList";
import QuizDetailPage from "./components/QuizDetailPage";
import Leaderboard from "./components/Leaderboard";
import  QuizResult from './components/QuizResult';
import  QuizCard from './components/QuizCard'
import QuizHistory from './components/QuizHistory';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import { AuthProvider } from '/authContext';
import { UserProfileProvider } from './components/UserProfileContext';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  console.log("Rendering App");

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  console.log('Current user role:', userRole);

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthProvider>
    <Router>
      <div>
        <UserProfileProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={!user ? <Login setUser={setUser} setUserRole={setUserRole} /> : <Navigate to={`/${userRole}`} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup setUser={setUser} setUserRole={setUserRole} /> : <Navigate to={`/${userRole}`} />}
            />
            <Route
              path="/user"
              element={userRole === "user" ? <UserDashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/instructor"
              element={userRole === "instructor" ? <InstructorDashboard user={user} /> : <Navigate to="/login" />}
            />

            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz-list/:categoryId" element={<QuizList />} /> 
           
            <Route path="/quiz/:categoryId/:difficulty" element={<QuizDetailPage />} />

            <Route path="/quiz-history" element={<QuizHistory />} />
         


            <Route path="/quiz/:categoryId/:quizIndex" element={<QuizzesPage />} />
            <Route path="/quiz-form" element={<QuizForm />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="/categories/" element={<Categories userType={userRole} currentUser={user}/>} />
            <Route path="/admin/manage-quizzes" element={<ManageQuizzes />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/quiz-card" element={<QuizCard />} />
            <Route
              path="/admin"
              element={
                userRole === "admin" ? (
                  <AdminDashboard user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to={user ? `/${userRole}` : "/login"} replace />} />
          </Routes>
        </UserProfileProvider>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
