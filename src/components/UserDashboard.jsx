import { useState } from "react";
import { useUserProfile } from "./UserProfileContext";
import Profile from "./UserProfile";
import QuizHistory from "./QuizHistory";
import Categories from "./Categories";
import Leaderboard from "./Leaderboard";
import { Link } from 'react-router-dom';

const UserDashboard = ({ user }) => {
  const { profile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#f4f6fb] font-sans">


      <aside className="w-full sm:w-72 bg-[#6a5acd] text-white p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">QuizzyWhiz!</h1>

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
            <p
              onClick={() => setCurrentPage("dashboard")}
              className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
            >
              Dashboard
            </p>
            <p
              onClick={() => setCurrentPage("quiz-history")}
              className="text-center cursor-pointer text-white text-lg hover:text-[#34d399] hover:underline transition-all duration-200"
            >
              Quiz History
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

 
      <div className="flex-1 p-6 sm:p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10 bg-white rounded-xl p-6 shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Dashboard!</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-600">
              Welcome, {user?.displayName || user?.email || "User"}!
            </span>
            <a href="Login.jsx" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</a>
          </div>
        </header>

        <main className="bg-white p-6 rounded-xl shadow-md border">
          {currentPage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border">
                <img
                  src="q.jpg"
                  alt="Leaderboard Icon"
                  className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
                />
                <h2 className="text-xl font-semibold text-[#6a5acd] mb-4">Start a New Quiz</h2>
                <button
                  onClick={() => setCurrentPage("categories")}
                  className="inline-block bg-[#6a5acd] text-white px-6 py-2 rounded-lg hover:bg-[#5c50cc] transition"
                >
                  Browse Categories
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border">
                <img
                  src="leader.avif"
                  alt="Leaderboard Icon"
                  className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
                />
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

          {currentPage === "profile" && <Profile />}
          {currentPage === "quiz-history" && <QuizHistory />}
          {currentPage === "categories" && <Categories />}
          {currentPage === "leaderboard" && <Leaderboard />}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
