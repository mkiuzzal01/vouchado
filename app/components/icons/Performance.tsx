interface Props {
  size?: number;
  color?: string;
}

export default function Performance({ color = "#31BFC8", size = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M27.5 15.8334L20.5 22.8334L17.8333 18.8334L12.5 24.1667"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.168 15.8334H27.5013V19.1667"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.9987 36.6667H24.9987C33.332 36.6667 36.6654 33.3334 36.6654 25V15C36.6654 6.66671 33.332 3.33337 24.9987 3.33337H14.9987C6.66536 3.33337 3.33203 6.66671 3.33203 15V25C3.33203 33.3334 6.66536 36.6667 14.9987 36.6667Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
