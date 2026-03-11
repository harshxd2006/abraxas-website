import React, { useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    // Complete immediately — no delay, no loading screen
    onComplete();
  }, [onComplete]);

  return null;
};

export default IntroAnimation;