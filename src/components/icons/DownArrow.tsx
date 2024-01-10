export default function DownArrow({ onClick }: { onClick?: () => void }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="10"
      viewBox="0 0 48 33"
      fill="none"
      className="opacity-75 custom-pointer"
      onClick={onClick}
    >
      <path
        d="M6.98521 0.243164C-2.10353 0.823319 -0.347019 8.7034 1.66733 12.5709C5.61545 16.9219 14.6236 26.5425 19.0713 30.2167C23.519 33.8908 28.015 31.7476 29.7071 30.2167C33.4135 26.1074 41.7932 16.8253 45.6607 12.5709C50.6885 2.90202 44.5327 0.323708 40.8263 0.243164C28.7402 2.90208 16.6541 2.90208 6.98521 0.243164Z"
        fill="#FFB400"
      />
    </svg>
  );
}
