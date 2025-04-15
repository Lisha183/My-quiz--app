import React, { useState, useEffect, useContext , useRef } from 'react';
import { useParams, Link , useNavigate } from 'react-router-dom';
import { AuthContext } from '/authContext';
import { saveQuizHistory } from './QuizHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faRedo, faArrowLeft, faTrophy, faCheck, faTimes, faForward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import QuizPerformance from './QuizPerformance';
import ProgressBar from './ProgressBar';
import { addDoc ,collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '/config/firebase'; 
import Leaderboard from './Leaderboard'; 

export const quizData = {
    Math: {
      easy: [
        {
          question: "What is 2 + 2?",
          type: "Short Answer",
          correctAnswer: "4",
        },
        {
          question: "What is 5 × 3?",
          type: "Short Answer",
          correctAnswer: "15",
        },
        {
          question: "What is 10 ÷ 2?",
          type: "Short Answer",
          correctAnswer: "5",
        },
        {
          question: "What is 7 - 4?",
          type: "Short Answer",
          correctAnswer: "3",
        },
      ],
      medium: [
        {
          question: "The derivative of x² is ______.",
          type: "Fill-in-the-Blank",
          correctAnswer: "2x",
         

        },
        {
          question: "The integral of 1/x is ______.",
          type: "Fill-in-the-Blank",
          correctAnswer: "ln|x|",
        },
        {
          question: "The square root of 16 is ______.",
          type: "Fill-in-the-Blank",
          correctAnswer: "4",
        },
        {
          question: "The solution to the equation x + 3 = 7 is ______.",
          type: "Fill-in-the-Blank",
          correctAnswer: "4",
        },
      ],
      hard: [
        {
          question: "What is the integral of 1/x dx?",
          options: ["ln|x| + C", "x + C", "1/x + C", "e^x + C"],
          type: "MCQ",
          correctAnswer: "ln|x| + C",
        },
        {
          question: "What is the derivative of sin(x)?",
          options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
          type: "MCQ",
          correctAnswer: "cos(x)",
        },
        {
          question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
          options: ["e", "1", "0", "Infinity"],
          type: "MCQ",
          correctAnswer: "e",
        },
        {
          question: "What is the solution to the equation x² - 4x + 4 = 0?",
          options: ["x = 2", "x = -2", "x = 4", "x = 0"],
          type: "MCQ",
          correctAnswer: "x = 2",
        },
      ],
    },
    Science: {
      easy: [
        {
          question: "What is the chemical symbol for water?",
          type: "Short Answer",
          correctAnswer: "H₂O",
        },
        {
          question: "How many planets are in our solar system?",
          type: "Short Answer",
          correctAnswer: "8",
        },
        {
          question: "What is the powerhouse of the cell?",
          type: "Short Answer",
          correctAnswer: "Mitochondria",
        },
        {
          question: "What is the chemical formula for methane?",
          type: "Short Answer",
          correctAnswer: "CH₄",
        },
      ],
     
      medium: [
          {
            question: "The boiling point of water is ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "100°C",
          },
          {
            question: "Plants absorb Carbon Dioxide from the atmosphere: ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "Yes",
          },
          {
            question: "Plants conduct photosynthesis in the root: ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "No",
          },
          {
            question: "The center of an atom is called the ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "Nucleus",
          },
        ],
      
      
      hard: [
        {
          question: "What is the term for the amount of energy required to remove an electron from an atom?",
          options: ["Ionization Energy", "Electronegativity", "Electron Affinity", "Atomic Radius"],
          type: "MCQ",
          correctAnswer: "Ionization Energy",
        },
        {
          question: "What is the second most abundant element in the Earth's crust?",
          options: ["Silicon", "Oxygen", "Aluminum", "Iron"],
          type: "MCQ",
          correctAnswer: "Silicon",
        },
        {
          question: "What is the name of the largest volcano in the solar system?",
          options: ["Olympus Mons", "Mauna Loa", "Mount Everest", "Mount Etna"],
          type: "MCQ",
          correctAnswer: "Olympus Mons",
        },
        {
          question: "Who is known for formulating the laws of motion and universal gravitation?",
          options: ["Sir Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
          type: "MCQ",
          correctAnswer: "Sir Isaac Newton",
        },
      ],
    },
    PopCulture: {
        easy: [
          {
            question: "Who played the character of Harry Potter in the movies?",
            type: "Short Answer",
            correctAnswer: "Daniel Radcliffe",
          },
          {
            question: "What is the name of the fictional wizarding school in Harry Potter?",
            type: "Short Answer",
            correctAnswer: "Hogwarts",
          },
          {
            question: "Who directed the movie *Inception*?",
            type: "Short Answer",
            correctAnswer: "Christopher Nolan",
          },
          {
            question: "What is the name of the fictional country in *Black Panther*?",
            type: "Short Answer",
            correctAnswer: "Wakanda",
          },
        ],
        medium: [
          {
            question: "The actor who played Iron Man in the *Marvel Cinematic Universe* is ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "Robert Downey Jr.",
          },
          {
            question: "The first *Star Wars* movie was released in ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "1977",
          },
          {
            question: "The TV show *Game of Thrones* is based on the book series *A Song of ______ and Fire*.",
            type: "Fill-in-the-Blank",
            correctAnswer: "Ice",
          },
          {
            question: "The main character of *Stranger Things* is named ______.",
            type: "Fill-in-the-Blank",
            correctAnswer: "Eleven",
          },
        ],
        hard: [
          {
            question: "Who is known as the King of Pop?",
            options: ["Michael Jackson", "Elvis Presley", "Prince", "Madonna"],
            type: "MCQ",
            correctAnswer: "Michael Jackson",
          },
          {
            question: "What is the name of the fictional city in *The Dark Knight* trilogy?",
            options: ["Metropolis", "Gotham City", "Star City", "Central City"],
            type: "MCQ",
            correctAnswer: "Gotham City",
          },
          {
            question: "Who won the Academy Award for Best Director in 2019?",
            options: ["Quentin Tarantino", "Sam Mendes", "Bong Joon-ho", "Martin Scorsese"],
            type: "MCQ",
            correctAnswer: "Bong Joon-ho",
          },
          {
            question: "Which actor starred as the Joker in *The Dark Knight*?",
            options: ["Jared Leto", "Jack Nicholson", "Heath Ledger", "Joaquin Phoenix"],
            type: "MCQ",
            correctAnswer: "Heath Ledger",
          },
        ],
      }
    }


const QuizDetailPage = () => {
  const { categoryId, difficulty } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [canSkip, setCanSkip] = useState(true);
  const currentQuestion = questions[currentQuestionIndex];
  const [userInput, setUserInput] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLeaderboardToggle = () => {
    setShowLeaderboard((prev) => !prev); 
  };

  const username =
    currentUser?.displayName ||
    currentUser?.email ||
    `User-${currentUser?.uid?.substring(0, 5)}` ||
    "Guest";

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setLoading(true);
      setError(null);
      setQuestions([]);

    
      if (quizData[categoryId] && difficulty && quizData[categoryId][difficulty]) {
        setQuestions(quizData[categoryId][difficulty]);
        setLoading(false);
      } else {
        try {
     
          const quizzesCollection = collection(db, "quizzes");
          const q = query(quizzesCollection, where("category", "==", categoryId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const fetchedQuiz = querySnapshot.docs[0].data();
            if (fetchedQuiz && fetchedQuiz.questions) {
              const formattedQuestions = fetchedQuiz.questions.map((q) => ({
                question: q.question,
                options: q.options.map((opt) => opt.text),
                correctAnswer: q.options.find((opt) => opt.isCorrect)?.text || "",
              }));
              setQuestions(formattedQuestions);
            } else {
              setError("No questions found for this category in Firebase.");
            }
          } else {
            setError(`No quiz found with the category: ${categoryId} in Firebase.`);
          }
        } catch (err) {
          console.error("Error fetching quiz questions from Firebase:", err);
          setError("Failed to load quiz questions.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuizQuestions();
    setTimeLeft(10);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setSkippedQuestions(0);
    setCanSkip(true);
  }, [categoryId, difficulty]);

  useEffect(() => {
    if (!loading && questions.length > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      if (timeLeft === 0) {
        handleNextQuestion();
      }

      return () => clearInterval(timer);
    }
  }, [loading, questions, currentQuestionIndex, quizCompleted, timeLeft]);

  useEffect(() => {
    if (quizCompleted && currentUser) {
      const saveToLeaderboard = async () => {
        const userName =
          currentUser.displayName ||
          currentUser.email ||
          `User-${currentUser.uid?.substring(0, 5)}`;

        try {
          await addDoc(collection(db, "leaderboard"), {
            name: userName,
            score,
            category: categoryId,
            difficulty,
            timestamp: new Date(),
          });
        } catch (error) {
          console.error("Error saving score to Firebase leaderboard:", error);
        }
      };
      saveToLeaderboard();
    }
  }, [quizCompleted, currentUser, score, categoryId, difficulty]);

const handleAnswerSelection = (answer) => {
   
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrect = currentQuestion?.correctAnswer.trim().toLowerCase();
  
    console.log("Correct Answer:", normalizedCorrect, "| Selected:", normalizedAnswer);
  
    const isCorrect = normalizedAnswer === normalizedCorrect;
  
    setSelectedAnswer(answer);
    setShowFeedback(true);
  
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    


  const userAnswer = {
    question: currentQuestion?.question,
    selectedAnswer: answer,
    isCorrect,
    correctAnswer: currentQuestion?.correctAnswer,
  };
  setUserAnswers((prev) => [...prev, userAnswer]);

  
  
  

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleSkipQuestion = () => {
    if (canSkip && !showFeedback && !quizCompleted) {
      setSkippedQuestions((prev) => prev + 1);
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setTimeLeft(10);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizCompleted(false);
    setTimeLeft(10);
    setUserAnswers([]);
    setSkippedQuestions(0);
    setCanSkip(true);
  };

  const progressPercentage =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const shareScore = () => {
    const shareText = `I scored ${score}/${questions.length} on the ${categoryId} quiz (${difficulty || "All Levels"})!`;
    if (navigator.share) {
      navigator
        .share({
          title: "Quiz Score!",
          text: shareText,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully."))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(`You can copy and share this: ${shareText} ${window.location.href}`);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading quiz questions...</div>;

  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  if (!Array.isArray(questions) || questions.length === 0)
    return <div className="p-4 text-center">No questions available for this category and difficulty.</div>;

if (quizCompleted) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-8 bg-gradient-to-br from-purple-300 to-blue-100 rounded-lg shadow-xl text-center">
  
<svg
  className="fixed top-[-120px] left-[-120px] w-[350px] h-[350px] z-0 animate-blob-slow"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="#c084fc" 
    d="M53.2,-62.1C67.8,-51.2,78.6,-33.1,78.3,-15.9C78,1.3,66.6,17.6,55.5,33.8C44.4,50,33.6,66.2,18.6,70.8C3.5,75.4,-15.9,68.3,-32.6,58.2C-49.3,48.2,-63.2,35.2,-68.5,19.7C-73.8,4.2,-70.5,-13.7,-61.5,-28.3C-52.6,-42.8,-37.9,-54,-22.2,-63.3C-6.4,-72.6,9.5,-80,25.7,-76.4C41.9,-72.8,53.2,-67.9,53.2,-62.1Z"
    transform="translate(100 100)"
  />
</svg>


<svg
  className="fixed bottom-[-120px] right-[-120px] w-[350px] h-[350px] z-0 animate-blob-slow delay-2000"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="#93c5fd" 
    d="M44.6,-65.7C57.3,-55.1,67.4,-43.6,71.6,-30.6C75.9,-17.6,74.4,-2.9,69.7,10.9C65,24.7,57,37.7,46.4,48.1C35.7,58.5,22.3,66.2,8.5,66.9C-5.4,67.6,-19.6,61.4,-33.5,53.4C-47.5,45.3,-61.3,35.4,-66.8,22.6C-72.3,9.7,-69.6,-6.2,-64.2,-21.1C-58.9,-36,-50.9,-49.8,-38.8,-61.1C-26.7,-72.4,-10.3,-81.1,3.5,-85.6C17.3,-90.1,34.7,-90.3,44.6,-80.5C54.5,-70.8,56.8,-51.9,44.6,-65.7Z"
    transform="translate(100 100)"
  />
</svg>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-bounce"><FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" /> Quiz Completed!</h2>
        <p className="text-xl text-gray-700 mb-4">
          Your final score is: <span className="font-bold text-green-600">{score}</span> out of <span className="font-bold text-blue-600">{questions.length}</span>
        </p>
        <button
          onClick={shareScore}
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-purple-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-6"
        >
          <FontAwesomeIcon icon={faShareAlt} className="mr-2" /> Share Score
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Answers:</h3>
        <div className="mb-6 overflow-y-auto max-h-96">
          {userAnswers.map((ua, index) => (
            <div key={index} className="mb-3 p-3 rounded-md shadow-inner">
              <p className="font-medium text-gray-700">{ua.question}</p>
              <p className={`text-sm ${ua.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}`}>
                Your answer: {ua.selectedAnswer} <FontAwesomeIcon icon={ua.isCorrect ? faCheck : faTimes} className="ml-1" />
              </p>
              <p className="text-sm text-gray-500">
                Correct answer: <span className="text-green-600 font-semibold">{ua.correctAnswer}</span>
              </p>
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4"><FontAwesomeIcon icon={faTrophy} className="mr-2 text-yellow-500" /> Leaderboard</h3>
       
         

        <div className="flex justify-center gap-4">
          
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" /> Restart Quiz
          </button>
          <Link
            to="/categories"
            className="inline-block px-5 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Categories
          </Link>
          
        </div>
      
          <button
          onClick={handleLeaderboardToggle}
          className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
        </button>

        {showLeaderboard && (
          <div className="mb-6 rounded-md shadow-md overflow-hidden mt-6">
            <Leaderboard category={categoryId} difficulty={difficulty} />
          </div>
        )}
      </div>
      );
    };

return (

<div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 py-10 bg-gradient-to-br from-purple-100 to-pink-200">
      {/* Floating Background Blobs */}
      <div className="absolute bottom-[-100px] right-[-100px] z-0">
        <svg className="animate-float w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#pinkPurple)" d="M43.5,-75.5C55.1,-67.6,62.5,-54.4,68.5,-41.3C74.5,-28.2,79.1,-14.1,75.4,-2.1C71.6,9.8,59.4,19.6,51.5,29.3C43.5,39.1,39.8,48.8,32.4,60.7C25,72.6,12.5,86.6,-1.6,89C-15.8,91.3,-31.5,82.1,-43.4,71.2C-55.4,60.3,-63.6,47.6,-70.7,34C-77.7,20.3,-83.6,5.7,-81.5,-7.7C-79.4,-21.1,-69.4,-33.2,-58.6,-44.5C-47.9,-55.8,-36.3,-66.4,-23,-73.7C-9.6,-80.9,5.4,-84.9,20.6,-84.4C35.9,-83.9,51.4,-79.4,43.5,-75.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="absolute top-[-100px] left-[-100px] z-0">
        <svg className="animate-float w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lightPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a3bffa', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d4b1fc', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path fill="url(#lightPurple)" d="M43.5,-75.5C55.1,-67.6,62.5,-54.4,68.5,-41.3C74.5,-28.2,79.1,-14.1,75.4,-2.1C71.6,9.8,59.4,19.6,51.5,29.3C43.5,39.1,39.8,48.8,32.4,60.7C25,72.6,12.5,86.6,-1.6,89C-15.8,91.3,-31.5,82.1,-43.4,71.2C-55.4,60.3,-63.6,47.6,-70.7,34C-77.7,20.3,-83.6,5.7,-81.5,-7.7C-79.4,-21.1,-69.4,-33.2,-58.6,-44.5C-47.9,-55.8,-36.3,-66.4,-23,-73.7C-9.6,-80.9,5.4,-84.9,20.6,-84.4C35.9,-83.9,51.4,-79.4,43.5,-75.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Main Quiz Container */}
      <div className="relative z-10 max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-2xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          {categoryId} Quiz ({difficulty || "All Levels"})
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Welcome, <span className="font-semibold text-green-600">{username}</span>
        </p>

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {ProgressBar && <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />}

          {canSkip && (
            <button
              onClick={handleSkipQuestion}
              className="px-3 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <FontAwesomeIcon icon={faForward} className="mr-2" /> Skip
            </button>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm sm:text-base text-gray-700 mb-1">
            Question <span className="font-bold text-blue-500">{currentQuestionIndex + 1}</span> of <span className="font-bold text-green-500">{questions.length}</span>
          </p>
          <p className="text-sm sm:text-base text-gray-700 mb-2">
            Time Left: <span className="font-bold text-red-600">{timeLeft}</span> seconds
          </p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            {currentQuestion?.question}
          </p>

          {difficulty === 'hard' && currentQuestion?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelection(option)}
              className={`w-full px-6 py-3 rounded-full text-white transition duration-300 shadow-md mb-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                selectedAnswer === option
                  ? String(selectedAnswer).trim().toLowerCase() === String(currentQuestion?.correctAnswer).trim().toLowerCase()
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}

          {(difficulty === 'medium' || difficulty === 'easy') && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnswerSelection(userInput.trim());
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="px-4 py-3 border border-gray-400 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium"
                placeholder="Type your answer"
                disabled={showFeedback}
              />
              <button
                type="submit"
                className={`px-6 py-3 text-white rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 font-semibold ${
                  difficulty === 'easy' ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-400'
                }`}
                disabled={showFeedback}
              >
                Submit Answer
              </button>
            </form>
          )}
        </div>

        {showFeedback && (
          <div className="mb-4 p-4 rounded-md shadow-inner bg-gray-100">
            <p
              className={`text-lg font-semibold ${
                String(selectedAnswer).trim().toLowerCase() === String(currentQuestion?.correctAnswer).trim().toLowerCase()
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {String(selectedAnswer).trim().toLowerCase() === String(currentQuestion?.correctAnswer).trim().toLowerCase()
                ? (<><FontAwesomeIcon icon={faCheck} className="mr-2" /> Correct!</>)
                : (<><FontAwesomeIcon icon={faTimes} className="mr-2" /> Incorrect! Correct answer: <span className="font-bold text-green-600">{currentQuestion?.correctAnswer}</span></>)}
            </p>
            {questions.length > currentQuestionIndex + 1 && (
              <button
                onClick={handleNextQuestion}
                className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
              >
                Next Question <FontAwesomeIcon icon={faStepForward} className="ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDetailPage;