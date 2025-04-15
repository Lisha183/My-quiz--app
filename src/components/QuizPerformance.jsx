import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "/config/firebase";

const QuizPerformance = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const snapshot = await getDocs(collection(db, "quizzes"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const fetchPerformanceData = async (quizId) => {
    const perfSnapshot = await getDocs(
      query(collection(db, "quizPerformance"), where("quizId", "==", quizId))
    );

    const performance = perfSnapshot.docs.map(doc => doc.data());
    setPerformanceData(prev => ({
      ...prev,
      [quizId]: performance
    }));
  };

  const calculateAverageScore = (quizId) => {
    const scores = performanceData[quizId]?.map(p => p.score) || [];
    const total = scores.reduce((sum, score) => sum + score, 0);
    return scores.length > 0 ? (total / scores.length).toFixed(2) : 0;
  };


  const quizzesByCategory = quizzes.reduce((acc, quiz) => {
    const category = quiz.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(quiz);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Quiz Performance</h2>


      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Filter by Category</h3>
        <div className="flex flex-wrap gap-4">
          {Object.keys(quizzesByCategory).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {selectedCategory && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quizzes in "{selectedCategory}" Category
          </h3>
          <ul>
            {quizzesByCategory[selectedCategory].map((quiz) => (
              <li key={quiz.id} className="mb-2">
                <button
                  onClick={() => fetchPerformanceData(quiz.id)}
                  className="text-indigo-600 hover:underline"
                >
                  {quiz.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}


      {Object.keys(performanceData).length > 0 && (
        <div className="mt-8">
          {quizzes
            .filter(q => performanceData[q.id])
            .map((quiz) => (
              <div key={quiz.id} className="mb-6">
                <h3 className="text-lg font-semibold">{quiz.title} - Performance</h3>
                <div className="bg-white p-4 rounded shadow">
                  <p><strong>Average Score:</strong> {calculateAverageScore(quiz.id)}%</p>
                  <p><strong>Attempts:</strong> {performanceData[quiz.id].length}</p>
                  <table className="w-full mt-4 border">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="p-2">User</th>
                        <th className="p-2">Score</th>
                        <th className="p-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceData[quiz.id].map((p, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{p.userId}</td>
                          <td className="p-2">{p.score}</td>
                          <td className="p-2">
                            {new Date(p.dateTaken).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QuizPerformance;
