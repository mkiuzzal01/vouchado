interface PlusProps {
  size?: number;
  color?: string;
}

export default function Plus({ size = 24, color = "#31BFC8" }: PlusProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M13.75 6.41667H8.25V0.916667C8.25 0.410406 7.83959 0 7.33333 0C6.82707 0 6.41667 0.410406 6.41667 0.916667V6.41667H0.916667C0.410406 6.41667 0 6.82707 0 7.33333C0 7.83959 0.410406 8.25 0.916667 8.25H6.41667V13.75C6.41667 14.2563 6.82707 14.6667 7.33333 14.6667C7.83959 14.6667 8.25 14.2563 8.25 13.75V8.25H13.75C14.2563 8.25 14.6667 7.83959 14.6667 7.33333C14.6667 6.82707 14.2563 6.41667 13.75 6.41667Z"
        fill={color}
      />
    </svg>
  );
}
