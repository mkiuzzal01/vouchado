interface Props {
  color?: string;
  size?: number;
}
export default function Option({ color = "#5ACCD3", size = 20 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M15.9993 29.3337C23.3327 29.3337 29.3327 23.3337 29.3327 16.0003C29.3327 8.66699 23.3327 2.66699 15.9993 2.66699C8.66602 2.66699 2.66602 8.66699 2.66602 16.0003C2.66602 23.3337 8.66602 29.3337 15.9993 29.3337Z"
        stroke="url(#paint0_linear_14460_21449)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 10.667V17.3337"
        stroke="url(#paint1_linear_14460_21449)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9922 21.333H16.0042"
        stroke="url(#paint2_linear_14460_21449)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_14460_21449"
          x1="6.11273"
          y1="5.42561"
          x2="28.9597"
          y2="9.8899"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5ACCD3" />
          <stop offset="1" stop-color="#2DAEB6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_14460_21449"
          x1="16.1293"
          y1="11.3566"
          x2="17.018"
          y2="11.3827"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5ACCD3" />
          <stop offset="1" stop-color="#2DAEB6" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_14460_21449"
          x1="15.9937"
          y1="21.4709"
          x2="16.0044"
          y2="21.471"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5ACCD3" />
          <stop offset="1" stop-color="#2DAEB6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
