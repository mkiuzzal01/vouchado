interface Props {
  size?: number;
  color?: string;
}

export default function Message({ size = 22, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M7.79232 17.4167H7.33398C3.66732 17.4167 1.83398 16.5 1.83398 11.9167V7.33334C1.83398 3.66668 3.66732 1.83334 7.33398 1.83334H14.6673C18.334 1.83334 20.1673 3.66668 20.1673 7.33334V11.9167C20.1673 15.5833 18.334 17.4167 14.6673 17.4167H14.209C13.9248 17.4167 13.6498 17.5542 13.4757 17.7833L12.1007 19.6167C11.4957 20.4233 10.5057 20.4233 9.90065 19.6167L8.52565 17.7833C8.37898 17.5817 8.03982 17.4167 7.79232 17.4167Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41602 7.33334H15.5827"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41602 11.9167H11.916"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
