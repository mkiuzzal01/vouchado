interface Props {
  size?: number;
  color?: string;
}

export default function EasyDeal({ size = 40, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M32.6587 25.8773L25.1087 33.4273C22.0087 36.5273 16.9754 36.5273 13.8587 33.4273L6.54207 26.1106C3.44207 23.0106 3.44207 17.9773 6.54207 14.8606L14.1087 7.32728C15.6921 5.74395 17.8754 4.89395 20.1087 5.01061L28.4421 5.41061C31.7754 5.56061 34.4254 8.21061 34.5921 11.5273L34.9921 19.8606C35.0921 22.1106 34.2421 24.2939 32.6587 25.8773Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.7747 20.3773C21.4736 20.3773 19.6081 18.5118 19.6081 16.2106C19.6081 13.9094 21.4736 12.0439 23.7747 12.0439C26.0759 12.0439 27.9414 13.9094 27.9414 16.2106C27.9414 18.5118 26.0759 20.3773 23.7747 20.3773Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <path
        d="M17.9414 28.7106L11.2747 22.0439"
        stroke={color}
        stroke-width="2.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
