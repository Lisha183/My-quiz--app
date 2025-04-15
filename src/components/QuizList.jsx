import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt, faArrowLeft, faHourglass, faTrophy} from '@fortawesome/free-solid-svg-icons'; // Import your desired icons
import backgroundImage from '/public/b.jpg'; 

const QuizList = () => {
  const { categoryId } = useParams();
  const difficulties = ['easy', 'medium', 'hard'];
  console.log("QuizList - Category ID:", categoryId);

  return (
    <div
      className="min-h-screen bg-purple-600 flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="flex items-center"> 
     
        <div className=" max-w-lg mx-auto mt-12 p-8 bg-white/20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Challenge Yourself with the {categoryId} Quiz!
          </h2>
          <ul className="space-y-6">
            {difficulties.map(difficulty => (
              <li key={difficulty}>
                <Link
                  to={`/quiz/${categoryId}/${difficulty}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 transition duration-300 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 "
                >
                  <FontAwesomeIcon icon={faLevelUpAlt} className="mr-3" />
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center px-5 py-3 text-gray-700 bg-gray-200/80 backdrop-filter backdrop-blur-sm rounded-full hover:bg-gray-300 transition duration-300 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Categories
            </Link>
          </div>
        </div >
      </div>
    </div>
  );
};

export default QuizList;