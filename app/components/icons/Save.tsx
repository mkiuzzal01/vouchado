interface Props {
  size?: number;
  color?: string;
}

export default function Save({ size = 24, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M15.9987 29.333C21.8898 29.333 26.6654 24.5574 26.6654 18.6664C26.6654 10.6664 15.9987 2.66638 15.9987 2.66638C15.481 5.98228 14.974 7.76182 13.332 10.6664C11.7308 9.92625 11.332 9.33305 10.6654 7.66638C7.9987 10.6664 5.33203 14.6664 5.33203 18.6664C5.33203 24.5574 10.1077 29.333 15.9987 29.333Z"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M19.3346 16.6664L12.668 23.333"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.168 16.9997H13.0013M13.3346 16.9997C13.3346 17.1838 13.1854 17.333 13.0013 17.333C12.8172 17.333 12.668 17.1838 12.668 16.9997C12.668 16.8156 12.8172 16.6664 13.0013 16.6664C13.1854 16.6664 13.3346 16.8156 13.3346 16.9997Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.168 22.9998H19.0013M19.3346 22.9998C19.3346 23.184 19.1854 23.3332 19.0013 23.3332C18.8172 23.3332 18.668 23.184 18.668 22.9998C18.668 22.8157 18.8172 22.6665 19.0013 22.6665C19.1854 22.6665 19.3346 22.8157 19.3346 22.9998Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
