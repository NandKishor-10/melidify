import { keyframes } from "@emotion/react";

const popAnimation = keyframes`
0% { transform: scale(1) }
50% { transform: scale(1.2) }
100% { transform: scale(1) }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(20px) scale(0.8);
    opacity: 0;
  }
  20% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-150px) scale(0.5);
    opacity: 0;
  }
`;

export {popAnimation, floatAnimation}