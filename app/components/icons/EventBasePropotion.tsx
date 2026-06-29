interface Props {
  size?: number;
  color?: string;
}

export default function EventBasePropotion({
  size = 36,
  color = "#31BFC8",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M8.48548 16.5033L6.27992 21.4657C3.49732 27.7266 2.10601 30.8569 3.6245 32.3755C5.14298 33.894 8.27341 32.5027 14.5343 29.7201L19.4968 27.5145C23.2729 25.8363 25.1609 24.997 25.4614 23.379C25.7618 21.7609 24.3008 20.2999 21.379 17.3781L18.622 14.6211C15.7 11.6992 14.239 10.2382 12.6209 10.5386C11.0029 10.8391 10.1638 12.7271 8.48548 16.5033Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.75 15.75L20.2501 26.25M6.75 23.25L12.75 29.25"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 12L28.5 7.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32.8125 9H32.625M33 9C33 9.2071 32.832 9.375 32.625 9.375C32.4178 9.375 32.25 9.2071 32.25 9C32.25 8.79289 32.4178 8.625 32.625 8.625C32.832 8.625 33 8.79289 33 9Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31.3125 19.875H31.125M31.5 19.875C31.5 20.0821 31.332 20.25 31.125 20.25C30.9178 20.25 30.75 20.0821 30.75 19.875C30.75 19.6678 30.9178 19.5 31.125 19.5C31.332 19.5 31.5 19.6678 31.5 19.875Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.1875 3.375H27M27.375 3.375C27.375 3.5821 27.207 3.75 27 3.75C26.7928 3.75 26.625 3.5821 26.625 3.375C26.625 3.16789 26.7928 3 27 3C27.207 3 27.375 3.16789 27.375 3.375Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.6875 4.875H16.5M16.875 4.875C16.875 5.0821 16.707 5.25 16.5 5.25C16.2928 5.25 16.125 5.0821 16.125 4.875C16.125 4.66789 16.2928 4.5 16.5 4.5C16.707 4.5 16.875 4.66789 16.875 4.875Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.2958 3C21.8944 4 22.3734 6.6 19.5 9"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33 14.7041C31.9999 14.1055 29.4 13.6266 27 16.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
