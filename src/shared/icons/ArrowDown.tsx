import React from 'react';
import { type IconProps } from '../types/icon.types';

const ArrowDownIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M1.2959 3.5C2.73821 4.94856 5.93753 7.84568 7.19628 7.84568C8.45503 7.84568 11.3921 4.94856 12.7033 3.5"
        stroke={color}
        strokeWidth="0.875"
        strokeLinecap="round"
      />
      <path
        d="M0.583008 6.75977C2.20561 8.20833 5.80485 11.1054 7.22094 11.1054C8.63703 11.1054 11.9412 8.20833 13.4163 6.75977"
        stroke={color}
        strokeWidth="0.875"
        strokeLinecap="round"
      />
    </g>

    <defs>
      <clipPath id="clip0">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowDownIcon;
