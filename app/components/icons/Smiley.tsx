interface Props {
  size?: number;
  color?: string;
}

export default function Smiley({ size = 36, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 3C21 3 23.25 4.9043 23.25 7.06772C23.25 8.46758 22.5423 10.5 20.25 10.5C19.0214 10.5 18.2367 9.59171 18 9"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.4375 15.5805V16.3748M12.5625 15.5805V16.3748M13.125 16.125C13.125 15.5037 12.8732 15 12.5625 15C12.2518 15 12 15.5037 12 16.125C12 16.7463 12.2518 17.25 12.5625 17.25C12.8732 17.25 13.125 16.7463 13.125 16.125ZM24 16.125C24 15.5037 23.7481 15 23.4375 15C23.1268 15 22.875 15.5037 22.875 16.125C22.875 16.7463 23.1268 17.25 23.4375 17.25C23.7481 17.25 24 16.7463 24 16.125Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 24C13.3682 25.8216 15.5464 27 18 27C20.4535 27 22.6318 25.8216 24 24"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
