interface Props {
  size?: number;
  color?: string;
}

export default function Opening({ size = 36, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M28.365 22.0387C28.365 23.9737 29.955 25.5487 31.89 25.5487C31.89 31.1737 30.48 32.5837 24.855 32.5837H10.785C5.16 32.5837 3.75 31.1737 3.75 25.5487V24.8587C5.685 24.8587 7.275 23.2687 7.275 21.3337C7.275 19.3987 5.685 17.8087 3.75 17.8087V17.1187C3.765 11.4937 5.16 10.0837 10.785 10.0837H24.84C30.465 10.0837 31.875 11.4937 31.875 17.1187V18.5287C29.94 18.5287 28.365 20.0887 28.365 22.0387Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.3147 10.0837H10.6797L15.0747 5.68875C18.6597 2.10375 20.4597 2.10375 24.0447 5.68875L24.9447 6.58875C23.9997 7.53375 23.7747 8.92875 24.3147 10.0837Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.8203 10.084L14.8203 32.584"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="5 5"
      />
    </svg>
  );
}
