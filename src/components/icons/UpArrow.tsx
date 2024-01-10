export default function UpArrow({ onClick }: { onClick?: () => void }) {
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
        d="M40.6198 32.2451C49.7085 31.665 47.952 23.7849 45.9377 19.9174C41.9895 15.5664 32.9814 5.9458 28.5337 2.27162C24.086 -1.40255 19.59 0.740716 17.8979 2.27162C14.1915 6.38089 5.81181 15.663 1.94426 19.9174C-3.08356 29.5863 3.0723 32.1646 6.7787 32.2451C18.8648 29.5862 30.9509 29.5862 40.6198 32.2451Z"
        fill="#FFB400"
      />
    </svg>
  );
}
