import React, { useState } from 'react';
import { useUserProfile } from './UserProfileContext'; 
import ManageQuizzes from './ManageQuizzes';
import Profile from './UserProfile';
import Leaderboard from './Leaderboard'; 
import { Link } from 'react-router-dom';
import Categories from './Categories';

const InstructorDashboard = ({ user }) => {
  const { profile, updateProfile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showStats, setShowStats] = useState(true); 

  const quizCount = 10; 
  const performanceCount = 5; 
  const feedbackCount = 20; 

  return (
    <div className="min-h-screen flex bg-[#f4f6fb] font-sans">

      <aside className="w-72 bg-[#6a5acd] text-white p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">QuizzyWhiz (Instructor)</h1>


          <div className="mb-6 flex flex-col items-center">
            {profile?.profilePictureUrl ? (
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
                  {profile?.firstName ? (
                    profile.firstName.charAt(0).toUpperCase() +
                    (profile.lastName ? profile.lastName.charAt(0).toUpperCase() : "")
                  ) : (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {profile?.firstName ? (
              <button onClick={() => setCurrentPage("profile")} className="font-semibold hover:underline">
                {profile.firstName} {profile.lastName}
              </button>
            ) : (
              <button onClick={() => setCurrentPage("profile")} className="text-sm opacity-75 hover:underline">
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
            
            <div className="flex justify-center">
  <Link
    to="/"
    className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
  >
    Home
  </Link>
</div>


            <p
              onClick={() => setCurrentPage("categories")}
              className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
            >
              Browse Categories
            </p>
            
          </nav>
        </div>


        <div className="mt-10">
          <img src="brain.png" alt="logo" className="w-16 mx-auto" />
        </div>
      </aside>


      <div className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10 bg-white rounded-xl p-6 shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-600">
              Hello, {user?.displayName || user?.email || "Instructor"}!
            </span>
            <a href="Login.jsx" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</a>
          </div>
        </header>

        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow border">
            <img
          src="quiz.avif"
          alt="Leaderboard Icon"
                     className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
        />
              <h3 className="text-lg font-semibold text-[#6a5acd] mb-2">Quizzes</h3>
              <p className="text-2xl text-gray-800">{quizCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border">
            <img
          src="p.webp "
          alt="Leaderboard Icon"
                     className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
        />
              <h3 className="text-lg font-semibold text-[#6a5acd] mb-2">Performance</h3>
              
              <p className="text-2xl text-gray-800">{performanceCount}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md border">
                <img
          src="leader.avif"
          alt="Leaderboard Icon"
                     className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
        />
        <br />
                  <h2 className="text-xl font-semibold text-[#6a5acd] mb-4">Top Scores</h2>
                  <button
                    onClick={() => setCurrentPage("leaderboard")}
                     className="inline-block bg-[#6a5acd] text-white px-6 py-2 rounded-lg hover:bg-[#5c50cc] transition"
                  >
                   View Leaderboard
                  </button>
                </div>
          </div>
        )}

        {currentPage === "manage-quizzes" && <ManageQuizzes />}
        {currentPage === "leaderboard" && <Leaderboard />}
        {currentPage === "profile" && <Profile />}
        {currentPage === "categories" && <Categories />}
        
      </div>
    </div>
  );
};

export default InstructorDashboard;
