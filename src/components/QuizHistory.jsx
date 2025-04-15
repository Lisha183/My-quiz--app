import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '/config/firebase';
import { AuthContext } from '/authContext';
import { format } from 'date-fns';


export async function saveQuizHistory(userId, quizId, score) { 
    console.log("saveQuizHistory: Saving history for user:", userId, "quizId:", quizId, "score:", score); // Log BEFORE
    try {
        const quizHistoryRef = collection(db, 'quizHistory');
        const newDocRef =  await addDoc(quizHistoryRef, {
            userId,
            quizId,
            score,
            dateCompleted: serverTimestamp(),
        });
        console.log('Quiz history saved successfully');
    } catch (error) {
        console.error('Error saving quiz history:', error);
        throw error; 
    }
}

function QuizHistory() {

    const [quizHistory, setQuizHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser,role } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        let q;
        if (role === 'admin' || role === 'instructor') {
       
            q = query(collection(db, 'quizHistory'), orderBy('dateCompleted', 'desc'));
          } else {
          
            q = query(
              collection(db, 'quizHistory'),
              where('userId', '==', currentUser.uid),
              orderBy('dateCompleted', 'desc')
            );
          }

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const historyData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    dateCompleted: doc.data().dateCompleted?.toDate() || null,
                }));
                setQuizHistory(historyData);
                setLoading(false);
            },
            (err) => {
                setError('Failed to fetch quiz history.');
                console.error('Error fetching quiz history:', err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser,role]);

    if (loading) return <div>Loading quiz history...</div>;
    if (error) return <div>Error: {error}</div>;
    if (quizHistory.length === 0) return <div>You haven't taken any quizzes yet.</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Quiz History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Quiz Name</th>
                            <th className="py-2 px-4 border-b text-left">Score</th>
                            <th className="py-2 px-4 border-b text-left">Date Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizHistory.map((historyItem) => (
                            <tr key={historyItem.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">
                                    {historyItem.quizName || historyItem.quizId}
                                </td>
                                <td className="py-2 px-4 border-b">{historyItem.score}</td>
                                <td className="py-2 px-4 border-b">
                                    {historyItem.dateCompleted &&
                                        format(historyItem.dateCompleted, 'yyyy-MM-dd HH:mm:ss')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuizHistory;