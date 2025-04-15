import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

 
  const progressColor = percentage <= 33 ? 'bg-red-600' :
                        percentage <= 66 ? 'bg-yellow-600' :
                        'bg-green-600';

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`${progressColor} h-4 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      >
        <span className="text-white text-xs absolute left-1/2 transform -translate-x-1/2 top-0.5">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

