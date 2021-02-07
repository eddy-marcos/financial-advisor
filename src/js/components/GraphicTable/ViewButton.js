import React from 'react';

const ViewButton = (props) => {
  return (
    <button 
      className="view-button text-center" 
      onClick={props.onClick}>
        {props.graphMode
          ? <img src="/public/images/chartlogo.jpg" />
          : <img src="/public/images/donutlogo.png" />
        }
    </button>
  );
}

export default ViewButton;