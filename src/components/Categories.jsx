import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '/config/firebase'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFlask, faGlobeAmericas, faTv, faSpinner, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '/authContext';

const categoryIcons = {
  Math: faBook,
  Science: faFlask,
  History: faGlobeAmericas,
  PopCulture: faTv,
};

const initialCategories = [
  { id: 'Math', title: 'Math', description: 'Test your math skills.' },
  { id: 'Science', title: 'Science', description: 'Science-related quizzes.' },
  { id: 'History', title: 'History', description: 'How well do you know history?' },
  { id: 'PopCulture', title: 'Pop Culture', description: 'Entertainment and pop culture.' },
];

const QuizCategoriesPage = () => {
  const navigate = useNavigate();
  const [firebaseCategories, setFirebaseCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchFirebaseCategories = async () => {
      try {
        const categories = new Set(initialCategories.map(cat => cat.id));
        const quizzesCollection = collection(db, 'quizzes');
        const querySnapshot = await getDocs(quizzesCollection);
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data && data.category) {
            categories.add(data.category);
          }
        });
        setFirebaseCategories(Array.from(categories));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Firebase quizzes:', err);
        setError('Failed to load quiz categories.');
        setLoading(false);
      }
    };

    fetchFirebaseCategories();
  }, []);

  useEffect(() => {
    const mergedCategories = [];
    const seenCategories = new Set();

    initialCategories.forEach(cat => {
      if (!seenCategories.has(cat.id)) {
        mergedCategories.push(cat);
        seenCategories.add(cat.id);
      }
    });

    firebaseCategories.forEach(cat => {
      const existingStaticCategory = initialCategories.find(sc => sc.id.toLowerCase() === cat.toLowerCase());
      if (!existingStaticCategory) {
        mergedCategories.push({
          id: cat,
          title: cat,
          description: 'Explore community-created quizzes in this category.',
        });
      }
    });

    setAllCategories(mergedCategories);
  }, [firebaseCategories]);

  const handleCategoryClick = (categoryId) => {
    if (
      (categoryId === 'Medium' || categoryId === 'Hard') && 
      !currentUser
    ) {
      alert('You must be logged in to access Medium or Hard quizzes.');
    } else {
      navigate(`/quiz-list/${categoryId}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 flex flex-col justify-center items-center p-8">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 bg-white text-indigo-600 py-2 px-4 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 text-sm sm:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
        </button>
        <FontAwesomeIcon icon={faSpinner} className="text-white text-5xl animate-spin mb-6" />
        <h2 className="text-3xl font-bold text-white text-center">Loading Categories...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-400 flex flex-col justify-center items-center p-8">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 bg-white text-red-600 py-2 px-4 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 text-sm sm:text-base"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
        </button>
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Uh Oh!</h2>
        <p className="text-red-100 text-lg mb-4 text-center">Failed to load quiz categories: {error}</p>
        <p className="text-white font-semibold text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 px-4 sm:px-6 lg:px-10 py-10 relative">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-white text-indigo-600 py-2 px-4 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 text-sm sm:text-base"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </button>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-10">
          Pick Your Brain Power!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allCategories.map((category) => {
            const lowerTitle = category.title.toLowerCase();
            const restricted =
              (lowerTitle === 'medium' || lowerTitle === 'hard') && !currentUser;

            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between items-center p-6 sm:p-8 text-center"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="text-4xl sm:text-5xl text-indigo-600 mb-4">
                  <FontAwesomeIcon icon={categoryIcons[category.id] || faBook} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                  {category.description}
                </p>
                <button
                  className={`mt-auto px-4 py-2 rounded-full w-full sm:w-auto text-sm sm:text-base focus:outline-none focus:ring-2 ${
                    restricted
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400'
                  }`}
                  disabled={restricted}
                >
                  Start Quiz
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizCategoriesPage;
