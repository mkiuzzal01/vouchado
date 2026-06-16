interface Props {
  color?: string;
  size?: number;
}

export default function Beauty({ color = "#1B696E", size = 86 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 86 78"
      fill="none"
    >
      <circle cx="37" cy="41" r="37" fill="#EAF9FA" fillOpacity="0.48" />

      {/* ... */}

      <path
        d="M46.0004 53.6747C52.2639 57.4127 59.9628 58.8807 67.4363 56.2648C74.9097 53.649 80.4084 47.9435 82.9734 41.1154C79.5204 39.0547 75.5833 37.8168 71.4931 37.5591"
        stroke={color}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Apply stroke={color} to other paths as needed */}

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.5355 8C38.9753 13.4184 34.793 21.6152 34.793 30.7888C34.793 39.9624 38.9753 48.1593 45.5355 53.5777C52.0957 48.1593 56.278 39.9624 56.278 30.7888C56.278 21.6152 52.0957 13.4184 45.5355 8Z"
        stroke="#31BFC8"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
