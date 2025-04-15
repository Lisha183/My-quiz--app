import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from './UserProfileContext';
import ProfilePicture from './ProfilePicture';

function ProfilePage() {
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-3xl text-center">
      <ProfilePicture imageUrl={profile.profilePictureUrl} alt={`${profile.firstName} ${profile.lastName}`} className="mx-auto w-24 h-24 rounded-full mb-4" />
      <h2 className="text-2xl font-bold text-blue-700">{profile.firstName} {profile.lastName}</h2>
      <p className="text-gray-600 mt-2">{profile.bio}</p>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <button
          onClick={() => navigate('/edit-profile')}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
