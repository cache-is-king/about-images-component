import React from 'react';

const Banner = ({ banner }) => {
  return (
    <div>
      <img className="bannerImg" src={banner} />
    </div>
  );
};

export default Banner;
