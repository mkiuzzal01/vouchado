interface Props {
  size?: number;
  color?: string;
}

export default function Revenue({ size = 44, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M23.0737 4.7423C22.3862 4.05462 21.4537 3.66818 20.4813 3.66797H7.33268C6.36022 3.66797 5.42759 4.05428 4.73996 4.74191C4.05232 5.42954 3.66602 6.36217 3.66602 7.33464V20.4833C3.66622 21.4557 4.05267 22.3882 4.74035 23.0756L20.6977 39.033C21.531 39.861 22.658 40.3257 23.8327 40.3257C25.0074 40.3257 26.1344 39.861 26.9677 39.033L39.031 26.9696C39.859 26.1364 40.3238 25.0093 40.3238 23.8346C40.3238 22.6599 39.859 21.5329 39.031 20.6996L23.0737 4.7423Z"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.7507 14.6654C14.2569 14.6654 14.6673 14.255 14.6673 13.7487C14.6673 13.2424 14.2569 12.832 13.7507 12.832C13.2444 12.832 12.834 13.2424 12.834 13.7487C12.834 14.255 13.2444 14.6654 13.7507 14.6654Z"
        fill={color}
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
