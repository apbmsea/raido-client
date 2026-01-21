import React from 'react';
import { type IconProps } from '../types/icon.types';

const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M25.5604 2.55602C25.5604 2.32074 25.2171 2.13002 24.7936 2.13002H12.7802L0.766811 2.13C0.343313 2.13 0 2.32073 0 2.55601V3.44675C0 3.68203 0.343313 3.87276 0.766811 3.87276H12.7802H18.7869H24.7936C25.2171 3.87276 25.5604 3.68203 25.5604 3.44675V2.55602Z"
        fill={color}
      />
      <path
        d="M25.5604 8.65569C25.5604 8.42041 25.2171 8.22969 24.7936 8.22969H12.7802L0.766811 8.22968C0.343313 8.22968 0 8.4204 0 8.65568V9.54642C0 9.7817 0.343313 9.97243 0.766811 9.97243H12.7802H24.7936C25.2171 9.97243 25.5604 9.7817 25.5604 9.54642V8.65569Z"
        fill={color}
      />
      <path
        d="M25.5604 14.7553C25.5604 14.5201 25.2171 14.3293 24.7936 14.3293H12.7802L0.766811 14.3293C0.343313 14.3293 0 14.52 0 14.7553V15.6461C0 15.8813 0.343313 16.0721 0.766811 16.0721H12.7802H24.7936C25.2171 16.0721 25.5604 15.8813 25.5604 15.6461V14.7553Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="25.5604" height="19.1703" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default MenuIcon;
