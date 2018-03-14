import React from 'react';

const SideBar = ({ price, hours, style, phone }) => {
  return (
    <div>
      <img src="https://s3-us-west-1.amazonaws.com/imagesfornamson/21.png" className="moneyIcon" />
      <div> 
        <div className="side">Price:</div>
        <div className="sideInfoPrice">{price}</div>
      </div>
      <div> 
        <div className="side">Hours of Operation:</div>
        <img src="https://s3-us-west-1.amazonaws.com/imagesfornamson/clock.png" className="clockIcon" />
        <div className="sideInfoHours">{hours}</div>
      </div>
      <div>
        <div className="side">Dress code:</div>
        <img src="https://s3-us-west-1.amazonaws.com/imagesfornamson/img_473372.png" className="dressIcon" />
        <div className="sideInfoStyle">{style}</div>
      </div>
      <div>
        <div className="side">Phone Number:</div>
        <img src="https://s3-us-west-1.amazonaws.com/imagesfornamson/telephone_318-61547.jpg" className="phoneIcon" />
        <div className="sideInfoPhone" >{phone}</div>
      </div>
    </div>
  );
};

export default SideBar;
