interface Props {
  size?: number;
  color?: string;
}

export default function ReachNewCustomer({
  size = 40,
  color = "#31BFC8",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M15.2682 18.1167C15.1016 18.1 14.9016 18.1 14.7182 18.1167C10.7516 17.9834 7.60156 14.7334 7.60156 10.7334C7.60156 6.65004 10.9016 3.33337 15.0016 3.33337C19.0849 3.33337 22.4016 6.65004 22.4016 10.7334C22.3849 14.7334 19.2349 17.9834 15.2682 18.1167Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.3495 6.66663C30.5828 6.66663 33.1828 9.28329 33.1828 12.5C33.1828 15.65 30.6828 18.2166 27.5661 18.3333C27.4328 18.3166 27.2828 18.3166 27.1328 18.3333"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.93516 24.2666C2.90182 26.9666 2.90182 31.3666 6.93516 34.05C11.5185 37.1166 19.0352 37.1166 23.6185 34.05C27.6518 31.35 27.6518 26.95 23.6185 24.2666C19.0518 21.2166 11.5352 21.2166 6.93516 24.2666Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30.5664 33.3334C31.7664 33.0834 32.8997 32.6 33.8331 31.8834C36.4331 29.9334 36.4331 26.7167 33.8331 24.7667C32.9164 24.0667 31.7997 23.6 30.6164 23.3334"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
