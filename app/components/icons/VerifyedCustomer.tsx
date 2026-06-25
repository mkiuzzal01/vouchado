interface Props {
  color?: string;
  size?: number;
}

export default function VerifyedCustomer({
  color = "#31BFC8",
  size = 32,
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
        d="M19.3333 9.99992C19.3333 6.31803 16.3485 3.33325 12.6667 3.33325C8.98477 3.33325 6 6.31803 6 9.99992C6 13.6818 8.98477 16.6666 12.6667 16.6666C16.3485 16.6666 19.3333 13.6818 19.3333 9.99992Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33203 26.0003C3.33203 20.8457 7.51071 16.667 12.6654 16.667C14.0968 16.667 15.453 16.9893 16.6654 17.5651"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.6654 22.6667V19.3333C25.9987 19.3333 23.9987 18 23.9987 18C23.9987 18 21.9987 19.3333 19.332 19.3333V22.6667C19.332 27.3333 23.9987 28.6667 23.9987 28.6667C23.9987 28.6667 28.6654 27.3333 28.6654 22.6667Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
