// components/VoteAnimation.tsx

import React from 'react';
import './VoteAnimation.css'; // Import the CSS for animations

// Define a type for the props
type VoteAnimationProps = {
  type: 'hot' | 'cold';
};

const VoteAnimation: React.FC<VoteAnimationProps> = ({ type }) => {
  const emojis = Array.from({ length: 100 }).map((_, index) => {
    // Random vertical position from top of the viewport
    const topPosition = Math.random() * 100;
    // Random animation duration between 1s and 5s
    const animationDuration = 1 + Math.random() * 4;
    // Random size between 0.5em and 1.5em
    const fontSize = 0.5 + Math.random();

    const style = {
      top: `${topPosition}vh`,
      fontSize: `${fontSize}em`,
      animationDuration: `${animationDuration}s`,
      left: type === 'hot' ? '-5%' : undefined,
      right: type === 'cold' ? '-5%' : undefined,
    };

    return (
      <div key={index} className={`vote-animation ${type}`} style={style}>
        {type === 'hot' ? '🔥' : '🧊'}
      </div>
    );
  });

  return <div className="vote-animation-container">{emojis}</div>;
};

export default VoteAnimation
