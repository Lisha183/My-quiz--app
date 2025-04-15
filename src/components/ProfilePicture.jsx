import React from 'react';

function ProfilePicture({ imageUrl, alt, className, ...props }) {
  return <img src={imageUrl} alt={alt} className={className} {...props} />;
}

export default ProfilePicture;