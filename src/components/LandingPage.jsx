import { Link } from "react-router-dom";
import { quizData } from './QuizDetailPage';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight">QuizzyWhiz!</h1>
          <nav className="space-x-6">
            <Link to="/login" className="hover:text-indigo-200 text-lg font-medium text-white">Log In</Link>
            <Link to="/signup" className="text-lg font-semibold hover:text-indigo-800 transition-all duration-300 text-white">Sign Up</Link>
          </nav>
        </div>
      </header>

     
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <h2 className="text-5xl font-extrabold mb-6">Daily Quiz, Daily Bonus - Play Today!</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">Challenge yourself with exciting quizzes and earn rewards every day. Get started now and track your progress!</p>
        <div className="mt-8">
          <Link to="/categories" className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-indigo-100 transition-all duration-300">
            Browse Quizzes
          </Link>
        </div>
      </section>

    
      <section className="bg-white py-12">
        <h3 className="text-3xl text-center font-semibold mb-8 text-gray-900">Featured Quizzes</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(quizData).map(([category, levels]) => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`/${category.toLowerCase()}.jpg`} 
                onError={(e) => { e.target.src = "/history.avif"; }}
                alt={`${category} Quiz`}
                className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-105"
              />
              <div className="p-6">
                <span className="text-xs uppercase text-indigo-500 font-semibold tracking-wide">Category</span>
                <h4 className="text-2xl font-bold mt-2 text-gray-800">{category}</h4>
                <p className="text-gray-600 text-sm mt-1 mb-4">{`Choose from ${Object.keys(levels).length} difficulty levels`}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {Object.keys(levels).map((level) => (
                    <Link
                      key={level}
                      to={`/quiz/${category}/${level}`}
                      className="text-sm bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium hover:bg-indigo-200 transition-all duration-300"
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

   
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 QuizzyWhiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
