import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import { useUserProfile } from './UserProfileContext';

function EditProfileForm() {
  const { profile, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState({ ...profile });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePictureUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, profilePictureUrl: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-purple-600 via-purple-400 to-purple-200 shadow-2xl rounded-3xl p-8">
      

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-purple-200 hover:text-purple-300 flex items-center gap-1"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center text-purple-100 mb-6">Edit Profile</h1>

      {formData.profilePictureUrl && (
        <div className="flex justify-center mb-6">
          <ProfilePicture
            imageUrl={formData.profilePictureUrl}
            alt={`${formData.firstName} ${formData.lastName}`}
            className="rounded-full border-4 border-purple-300 w-28 h-28"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-purple-200">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-purple-200">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-semibold text-purple-200">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full px-4 py-2 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label htmlFor="profilePicture" className="block text-sm font-semibold text-purple-200">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
