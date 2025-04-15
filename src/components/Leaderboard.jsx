import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, where, onSnapshot } from 'firebase/firestore';
import { db } from '/config/firebase';
import { FaTrophy } from 'react-icons/fa'; 

const trophyColors = ['text-yellow-400', 'text-gray-400', 'text-orange-500'];

const FirebaseLeaderboard = ({ category, difficulty, limitCount = 10 }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const leaderboardCollection = collection(db, 'leaderboard');
    let q = query(
      leaderboardCollection,
      orderBy('score', 'desc'),
      orderBy('timestamp', 'asc'),
      limit(limitCount)
    );

    if (category) {
      q = query(q, where('category', '==', category));
    }
    if (difficulty) {
      q = query(q, where('difficulty', '==', difficulty));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaderboardData(data);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching Firebase leaderboard:', err);
        setError('Failed to load leaderboard.');
        setLoading(false);
      }
    );

    return () => unsubscribe(); 
  }, [category, difficulty, limitCount]);

  if (loading) return <p className="text-center">Loading leaderboard...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-6 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h3>
      {leaderboardData.length > 0 ? (
        <ol className="space-y-4">
          {leaderboardData.map((entry, index) => (
            <li
              key={entry.id}
              className={`flex items-center justify-between bg-indigo-700 rounded-full px-4 py-3 shadow-md ${
                index === 0 ? 'animate-bounce' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
          
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${entry.name || 'player'}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />

           
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">{entry.name || 'Player'}</span>
                  {index < 3 && (
                    <FaTrophy className={`ml-1 ${trophyColors[index]} text-xl`} title="Top Player" />
                  )}
                </div>
              </div>

          
              <span className="text-lg font-bold">{entry.score}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center">No scores recorded yet for this quiz.</p>
      )}
    </div>
  );
};

export default FirebaseLeaderboard;
