import React from 'react';
import PropTypes from 'prop-types';

const About = ({ description, name, photo }) => {
  return (
    <div className="aboutWrap">
      <div className="restaurant">
        {name}
        <div className="line" />
      </div>
      <div className="rowAbout">
        <div className="description">
          {description}
        </div>
      </div>
      <div className="photo">
        <img className="photoOne" src={photo[0]} />
        <img className="photoTwo" src={photo[1]} />
        <img className="photoThree" src={photo[2]} />
      </div>
    </div>
  );
};

export default About;
