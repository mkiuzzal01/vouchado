interface Props {
  size?: number;
  color?: string;
}

export default function FreeCancellation({
  size = 32,
  color = "#31BFC8",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M15.9993 27.9974C22.2585 27.9974 27.3327 22.9233 27.3327 16.6641C27.3327 10.4049 22.2585 5.33075 15.9993 5.33075C9.74012 5.33075 4.66602 10.4049 4.66602 16.6641C4.66602 22.9233 9.74012 27.9974 15.9993 27.9974Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.83935 24.9349L4.66602 28.0015"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.1875 24.888L27.3342 27.9947"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66602 3.99738L2.66602 7.99738"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.334 7.99738L25.334 3.99738"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.7053 13.369L19.3049 19.9686M19.3049 13.3595L12.7053 19.9592"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
