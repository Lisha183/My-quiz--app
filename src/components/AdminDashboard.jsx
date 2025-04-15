import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getCountFromServer, getDocs, Timestamp } from "firebase/firestore";
import { db } from "/config/firebase"; 
import ManageUsers from "./ManageUsers"; 
import ManageQuizzes from "./ManageQuizzes"; 
import { useUserProfile } from "./UserProfileContext"; 
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { startOfDay, endOfDay } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Categories from "./Categories"; 

import Leaderboard from "./Leaderboard";
import Profile from "./UserProfile"; 
const AdminDashboard = () => {
  const { profile } = useUserProfile();  
  const [currentPage, setCurrentPage] = useState("home");
  const [showStats, setShowStats] = useState(true); 
  const [userCount, setUserCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [todayResults, setTodayResults] = useState([]);
  const [todayAverageScore, setTodayAverageScore] = useState(0);

  const userTarget = 100;
  const instructorTarget = 20;
  const quizTarget = 50;

  const userProgress = Math.min((userCount / userTarget) * 100, 100);
  const instructorProgress = Math.min((instructorCount / instructorTarget) * 100, 100);
  const quizProgress = Math.min((quizCount / quizTarget) * 100, 100);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getCountFromServer(usersCollection);
        setUserCount(usersSnapshot.data().count);

        const instructorsQuery = query(usersCollection, where("role", "==", "instructor"));
        const instructorsSnapshot = await getCountFromServer(instructorsQuery);
        setInstructorCount(instructorsSnapshot.data().count);

        const quizzesCollection = collection(db, "quizzes");
        const quizzesSnapshot = await getCountFromServer(quizzesCollection);
        setQuizCount(quizzesSnapshot.data().count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchTodayAnalytics = async () => {
      try {
        const now = new Date();
        const start = startOfDay(now);
        const end = endOfDay(now);

        const leaderboardQuery = query(
          collection(db, "leaderboard"),
          where("timestamp", ">=", Timestamp.fromDate(start)),
          where("timestamp", "<=", Timestamp.fromDate(end))
        );

        const snapshot = await getDocs(leaderboardQuery);
        const results = snapshot.docs.map(doc => doc.data());

        setTodayResults(results);

        const totalScore = results.reduce((sum, item) => sum + (item.score || 0), 0);
        setTodayAverageScore(results.length > 0 ? totalScore / results.length : 0);
      } catch (error) {
        console.error("Error fetching today's analytics:", error);
      }
    };

    fetchTodayAnalytics();
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
    setShowStats(false); 
  };

  const goToHomePage = () => {
    setCurrentPage("home");
    setShowStats(true);
  };

  const DashboardProgress = ({ label, now, variant }) => (
    <div style={{ marginBottom: '1rem' }}>
      <h5>{label}</h5>
      <ProgressBar now={now} label={`${Math.round(now)}%`} variant={variant} animated />
    </div>
  );

  const chartData = [
    { name: "Today", avgScore: todayAverageScore },
    { name: "Yesterday", avgScore: 72 },
    { name: "Last 7 Days", avgScore: 65 },
  ];

  return (
    <div className="min-h-screen flex bg-[#f4f6fb] font-sans">
      <aside className="w-72 bg-[#6a5acd] text-white p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div>
          <h1 className="text-center text-2xl font-bold mb-8">Quizzy Whiz</h1>

<div className="mb-6 flex flex-col items-center">
            {profile && profile.profilePictureUrl ? (
              <button onClick={() => setCurrentPage("profile")} className="mb-2">
                <img
                  src={profile.profilePictureUrl}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="rounded-full w-20 h-20 object-cover shadow-md border-2 border-white"
                />
              </button>
            ) : (
              <button onClick={() => setCurrentPage("profile")} className="mb-2">
                <div className="rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center text-gray-600">
                  {profile && profile.firstName ? (
                    profile.firstName.charAt(0).toUpperCase() +
                    (profile.lastName ? profile.lastName.charAt(0).toUpperCase() : "")
                  ) : (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
              </button>
            )}
            {profile && profile.firstName ? (
              <button
                onClick={() => setCurrentPage("profile")}
                className="text-center font-semibold hover:underline"
              >
                {profile.firstName} {profile.lastName}
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage("profile")}
                className="text-center text-sm text-white opacity-75 hover:underline"
              >
                Add Profile Info
              </button>
            )}
          </div>
          <nav className="space-y-4">
           <p onClick={() => setCurrentPage("dashboard")} className="cursor-pointer text-lg text-center hover:text-[#34d399] hover:underline transition-all duration-200">
                         Dashboard
                       </p>
                       <p onClick={() => setCurrentPage("manage-quizzes")} className="cursor-pointer text-lg text-center hover:text-[#34d399] hover:underline transition-all duration-200">
                         Manage Quizzes
                       </p>
                       <p
              onClick={() => setCurrentPage("categories")}
              className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
            >
              Browse Categories
            </p>
            <p
              onClick={() => setCurrentPage("leaderboard")}
              className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
            >
              Leaderboard
            </p>
                      
                       <div className="flex justify-center">
             <Link
               to="/"
               className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
             >
               Home
             </Link>
             </div>
          </nav>
        </div>
        <div className="mt-10">
          <img src="brain.png" alt="logo" className="w-16 mx-auto" />
        </div>
      </aside>

      <div className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10 bg-white rounded-xl p-6 shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Admin Dashboard!</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-600">Admin</span>
            <a href="Login.jsx" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</a>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <h2 className="text-xl font-semibold text-[#6a5acd] mb-4">Users</h2>
            <p className="text-2xl">{userCount}</p>
            <DashboardProgress label="User Registration Progress" now={userProgress} variant="success" />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <h2 className="text-xl font-semibold text-[#6a5acd] mb-4">Instructors</h2>
            <p className="text-2xl">{instructorCount}</p>
            <DashboardProgress label="Instructor Sign-Up Progress" now={instructorProgress} variant="info" />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border">
            <h2 className="text-xl font-semibold text-[#6a5acd] mb-4">Quizzes</h2>
            <p className="text-2xl">{quizCount}</p>
            <DashboardProgress label="Quiz Creation Progress" now={quizProgress} variant="warning" />
          </div>
        </main>

        {showStats && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">📊 Today's Quiz Analytics</h2>
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <p><strong>Total Quizzes Taken:</strong> {todayResults.length}</p>
              <p><strong>Average Score:</strong> {todayAverageScore.toFixed(2)}</p>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {currentPage === "home" && (
          <div className="mt-8">
            <p>This is your dashboard. Select an action from the sidebar.</p>
          </div>
        )}

        {currentPage === "view-profile" && profile && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Profile Details</h2>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            {profile.profilePictureUrl && (
              <img src={profile.profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full mt-4" />
            )}
          </div>
        )}

        {currentPage === "manage-users" && <ManageUsers />}
        {currentPage === "manage-quizzes" && <ManageQuizzes />}
      
        {currentPage === "categories" && <Categories />}
        {currentPage === "leaderboard" && <Leaderboard />}
        {currentPage === "profile" && <Profile />}
      </div>
    </div>
  );
};

export default AdminDashboard;
