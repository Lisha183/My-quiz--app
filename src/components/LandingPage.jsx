import { Link } from "react-router-dom";
import { quizData } from './QuizDetailPage';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">QuizzyWhiz!</h1>
          <nav className="space-x-4 sm:space-x-6">
            <Link to="/login" className="text-white hover:text-indigo-200 text-base sm:text-lg font-medium">Log In</Link>
            <Link to="/signup" className="text-white text-base sm:text-lg font-semibold hover:text-indigo-800 transition-all duration-300">Sign Up</Link>
          </nav>
        </div>
      </header>


      <section className="text-center py-16 sm:py-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">Daily Quiz, Daily Bonus - Play Today!</h2>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8">
          Challenge yourself with exciting quizzes and earn rewards every day. Get started now and track your progress!
        </p>
        <Link
          to="/categories"
          className="inline-block bg-white text-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:bg-indigo-100 transition-all duration-300"
        >
          Browse Quizzes
        </Link>
      </section>


      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-900">Featured Quizzes</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(quizData).map(([category, levels]) => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`/${category.toLowerCase()}.jpg`}
                onError={(e) => { e.target.src = "/history.avif"; }}
                alt={`${category} Quiz`}
                className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 sm:p-6">
                <span className="text-xs uppercase text-indigo-500 font-semibold tracking-wide">Category</span>
                <h4 className="text-xl sm:text-2xl font-bold mt-2 text-gray-800">{category}</h4>
                <p className="text-gray-600 text-sm mt-1 mb-4">{`Choose from ${Object.keys(levels).length} difficulty levels`}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(levels).map((level) => (
                    <Link
                      key={level}
                      to={`/quiz/${category}/${level}`}
                      className="text-xs sm:text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium hover:bg-indigo-200 transition duration-300"
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <footer className="bg-gray-800 text-white py-6 mt-auto px-4">
        <div className="max-w-7xl mx-auto text-center text-sm sm:text-base">
          &copy; 2025 QuizzyWhiz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
