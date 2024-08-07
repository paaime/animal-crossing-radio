export default function Button({
  children,
  onClick,
  small = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  small?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center hover:scale-95 transition duration-200 ${
        small ? 'h-[40px] w-[50px]' : 'h-[50px] w-[65px]'
      } ac-button`}
      onClick={onClick}
    >
      <div
        className="button-bg"
        style={{
          backgroundColor: '#0CC0B5',
          width: small ? '42px' : '57px',
          height: small ? '33px' : '44px',
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 10,
        }}
      ></div>
      <svg
        width={small ? '50' : '71'}
        height={small ? '37' : '50'}
        viewBox="0 0 71 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <path
          d="M71 27.4847C71 44.8723 55.1061 55 35.5 55C15.8939 55 0 44.8723 0 27.4847C0 10.0972 15.8939 6.28432e-06 35.5 6.28432e-06C55.1061 6.28432e-06 71 10.0972 71 27.4847Z"
          fill="#FFF9E3"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </button>
  );
}
