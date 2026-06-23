interface Props {
  size?: number;
  color?: string;
}

export default function Discount({ size = 18, color = "#292D32" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M14.6964 11.6448L11.2989 15.0423C9.90393 16.4373 7.63893 16.4373 6.23643 15.0423L2.94393 11.7498C1.54893 10.3548 1.54893 8.08978 2.94393 6.68728L6.34893 3.29728C7.06143 2.58478 8.04393 2.20228 9.04893 2.25478L12.7989 2.43478C14.2989 2.50228 15.4914 3.69478 15.5664 5.18728L15.7464 8.93727C15.7914 9.94977 15.4089 10.9323 14.6964 11.6448Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.6992 9.1698C9.66368 9.1698 8.82422 8.33033 8.82422 7.2948C8.82422 6.25927 9.66368 5.4198 10.6992 5.4198C11.7348 5.4198 12.5742 6.25927 12.5742 7.2948C12.5742 8.33033 11.7348 9.1698 10.6992 9.1698Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8.07422 12.9198L5.07422 9.9198"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
