interface Props {
  size?: number;
  color?: string;
}

export default function Accessibility({ size = 20, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 12.4995L7.73811 9.89238C7.91034 9.63403 8.14035 9.41934 8.40993 9.26529L10.599 8.01438C11.1619 7.69274 11.8483 7.67368 12.4282 7.96361C13.0851 8.29206 13.4658 8.98587 13.7461 9.66473C14.2069 10.7809 15.3984 11.9995 18 11.9995"
        stroke="#31BFC8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.9997 9L11.7769 14.5951M10.4997 8.5L9.77426 11.7645C9.60659 12.519 9.88866 13.3025 10.4988 13.777L13.9997 16.5L15.4997 21"
        stroke="#31BFC8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 16L9 17.5L6.5 20.5"
        stroke="#31BFC8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 4.5C15 5.32843 14.3284 6 13.5 6C12.6716 6 12 5.32843 12 4.5C12 3.67157 12.6716 3 13.5 3C14.3284 3 15 3.67157 15 4.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
