interface Props {
  size?: number;
  color?: string;
}

export default function AlreadyRedeem({ size = 44, color = "#FF4842" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M19.9883 36.4285H31.8499C38.6333 36.4285 40.3199 34.7418 40.3199 27.9585C37.9733 27.9585 36.0849 26.0518 36.0849 23.7235C36.0849 21.3768 37.9733 19.4701 40.3199 19.4701V17.7835C40.3199 11.0001 38.6333 9.31348 31.8499 9.31348H20.1533V21.7618"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.1542 30.928V36.428H15.0759C12.3626 36.428 10.7676 34.5763 9.00755 30.323L8.67755 29.498C10.8959 28.618 11.9776 26.0513 11.0426 23.833C10.1442 21.6147 7.59588 20.5513 5.35922 21.468L5.04755 20.6797C2.40755 14.2263 3.32422 11.9713 9.77755 9.31301L14.6176 7.33301L20.1542 20.753V25.428"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.964 36.4287H14.6523"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
