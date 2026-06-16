import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function Adventures({
  size = 87,
  color = "#1B696E",
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 87 78"
      fill="none"
      {...props}
    >
      <circle cx="37" cy="41" r="37" fill="#EAF9FA" fillOpacity="0.48" />

      <path
        d="M24.4832 57.3284L50.0038 20.6426L45.3331 16.9061L29.92 38.3911L25.2493 34.6546L11.2299 55.8547C9.03176 59.1787 11.4154 63.6126 15.4004 63.6126H27.7669C24.5361 63.6126 22.6383 59.9805 24.4832 57.3284Z"
        fill="#BFEBEE"
      />

      <path
        d="M36.9259 45.8642L28.8098 36.7742C27.0313 34.7822 23.8375 35.0591 22.4283 37.3275L9.89567 57.502C8.24041 60.1666 10.1566 63.6127 13.2934 63.6127H79.9738C83.053 63.6127 84.9775 60.2794 83.4379 57.6127L70.6998 35.5497C69.4493 33.3839 66.5403 32.8838 64.6383 34.5077L60.2792 38.2297M48.6026 48.1996L60.2792 38.2297M34.5906 31.3852L42.733 19.9858C44.4043 17.646 47.9247 17.7812 49.4116 20.2423L60.2792 38.2297"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M24.2266 4.46707C26.5619 4.46707 27.496 5.4012 27.9631 7.73653C28.4302 5.4012 29.3643 4 31.6996 4"
        stroke="#31BFC8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10.25 10.5927C12.5853 10.5927 13.5195 11.5268 13.9865 13.8621C14.4536 11.5268 15.3877 10.1256 17.7231 10.1256"
        stroke="#31BFC8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M21.9043 17.3731C24.2396 17.3731 25.1738 18.3073 25.6408 20.6426C26.1079 18.3073 27.042 16.9061 29.3773 16.9061"
        stroke="#31BFC8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
