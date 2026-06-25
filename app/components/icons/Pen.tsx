interface Interface {
  color?: string;
  size?: number;
}

export default function Pen({ color = "#31BFC8", size = 24 }: Interface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.36847 14.19C10.2291 9.70423 18.9735 0.942207 22.6734 0.754294C24.9624 0.535057 20.4022 8.65557 9.59812 17.5411M11.3226 9.55486L14.1446 12.4049M0.75 23.067C1.63685 19.9327 1.07734 21.473 1.38009 17.8636C1.54132 17.3292 1.86572 15.6709 3.89197 14.8444C6.19522 13.9049 7.88372 15.3251 8.32015 15.9925C9.60587 17.3865 9.75487 19.1177 8.32015 21.0955C6.88537 23.0732 2.6294 23.5646 0.75 23.067Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
