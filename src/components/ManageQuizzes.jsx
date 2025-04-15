import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "/config/firebase";
import { getAuth } from "firebase/auth";
import QuizForm from "./QuizForm";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);


  const fetchQuizzes = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const snapshot = await getDocs(
        query(collection(db, "quizzes"), where("createdBy", "==", currentUser.uid))
      );
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuizzes(data);
    }
  };


  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "quizzes", id));
    fetchQuizzes();
  };


  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
  };

 
  const handleFormSubmit = async (quizData) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {

      const formattedQuestions = quizData.questions.map((q) => {
        if (q.type === "short-answer") {
          return {
            question: q.questionText,
            correctAnswer: q.correctAnswer,
            difficulty: q.difficulty || "easy",
            type: "short-answer",
          };
        } else {
          return {
            question: q.questionText,
            options: q.options.map((option, index) => ({
              text: option,
              isCorrect: q.correctAnswerIndex === index,
            })),
            correctAnswer: q.options[q.correctAnswerIndex],
            difficulty: q.difficulty || "easy",
            type: q.type || "multiple-choice", 
          };
        }
      });
      



      const quizToSave = {
        title: quizData.title,
        category: quizData.category,
        questions: formattedQuestions,
        createdBy: currentUser.uid,
      };

      if (quizData.id) {

        await updateDoc(doc(db, "quizzes", quizData.id), quizToSave);
      } else {
    
        await addDoc(collection(db, "quizzes"), quizToSave);
      }
      setEditingQuiz(null);
      fetchQuizzes(); 
    }
  };

  useEffect(() => {
    fetchQuizzes(); 
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Quizzes</h2>

    
      <QuizForm onSubmit={handleFormSubmit} initialData={editingQuiz} />

     
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Created By</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="border-t align-top">
              <td className="p-2">{quiz.title}</td>
              <td className="p-2">{quiz.category}</td>
              <td className="p-2">{quiz.createdBy || "N/A"}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(quiz)} className="mr-2 text-blue-500">Edit</button>
                <button onClick={() => handleDelete(quiz.id)} className="text-red-500">Delete</button>
              </td>
              <td className="p-4 bg-gray-50" colSpan="4">
                
                      {quiz.questions && quiz.questions.length > 0 ? (
  quiz.questions.map((q, i) => (
    <div key={i} className="mb-4">
      <p className="font-medium">Q{i + 1}: {q.question}</p>


      {q.type === "short-answer" ? (
        <p className="ml-6 text-sm text-blue-600">
          <strong>Answer:</strong> {q.correctAnswer || "(No correct answer provided)"}
        </p>
      ) : (
Array.isArray(q.options) && q.options.length > 0 ? (
  <ul className="ml-6 list-disc">
    {q.options.map((opt, j) => (
      <li
        key={j}
        className={`${opt.isCorrect ? "text-green-600 font-semibold" : ""}`}
      >
        {opt.text || "(No text)"}
        {opt.isCorrect && " ✔"}
      </li>
    ))}
  </ul>
) : (
  <p className="text-sm text-gray-500 ml-6">No options provided.</p>
)
)}

{q.difficulty && (
<p className="text-sm text-gray-600 ml-6">Difficulty: {q.difficulty}</p>
)}
</div>
))
) : (
<p className="text-sm text-gray-500">No questions added.</p>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuizzes;