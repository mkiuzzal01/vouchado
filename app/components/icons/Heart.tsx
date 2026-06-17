interface Props {
  size?: number;
  color?: string;
}

export default function Heart({ size = 22, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M11.569 19.0758C11.2573 19.1858 10.744 19.1858 10.4323 19.0758C7.77398 18.1683 1.83398 14.3825 1.83398 7.96584C1.83398 5.13334 4.11648 2.84167 6.93065 2.84167C8.59898 2.84167 10.0748 3.64834 11.0007 4.89501C11.9265 3.64834 13.4115 2.84167 15.0707 2.84167C17.8848 2.84167 20.1673 5.13334 20.1673 7.96584C20.1673 14.3825 14.2273 18.1683 11.569 19.0758Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
