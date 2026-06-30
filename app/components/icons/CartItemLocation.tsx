interface Props {
  size?: number;
  color?: string;
}

export default function CartItemLocation({
  size = 24,
  color = "#637381",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.5 9.00037C14.5 10.3811 13.3807 11.5004 12 11.5004C10.6193 11.5004 9.5 10.3811 9.5 9.00037C9.5 7.61966 10.6193 6.50037 12 6.50037C13.3807 6.50037 14.5 7.61966 14.5 9.00037Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M13.2574 17.494C12.9201 17.8188 12.4693 18.0004 12.0002 18.0004C11.531 18.0004 11.0802 17.8188 10.7429 17.494C7.6543 14.5012 3.51519 11.1579 5.53371 6.3041C6.6251 3.67969 9.24494 2.00037 12.0002 2.00037C14.7554 2.00037 17.3752 3.6797 18.4666 6.3041C20.4826 11.1518 16.3536 14.5115 13.2574 17.494Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M18 20.0004C18 21.105 15.3137 22.0004 12 22.0004C8.68629 22.0004 6 21.105 6 20.0004"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}
