interface Props {
  size?: number;
  color?: string;
}

export default function DaysCancellation({
  size = 20,
  color = "#637381",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99935 17.4984C13.9113 17.4984 17.0827 14.3271 17.0827 10.4151C17.0827 6.50304 13.9113 3.33173 9.99935 3.33173C6.08733 3.33173 2.91602 6.50304 2.91602 10.4151C2.91602 14.3271 6.08733 17.4984 9.99935 17.4984Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.89935 15.5843L2.91602 17.501"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.1172 15.555L17.0839 17.4967"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.16602 2.49835L1.66602 4.99835"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.334 4.99835L15.834 2.49835"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.9403 8.3556L12.0651 12.4804M12.0651 8.3497L7.9403 12.4745"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
