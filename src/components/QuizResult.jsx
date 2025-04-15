import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quiz Result</h1>
        </div>
      </header>

      
      <section className="p-12">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Score: {score}/{total}</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 px-6 py-3 rounded-lg text-white hover:bg-indigo-700"
          >
            Return to Quiz List
          </button>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
