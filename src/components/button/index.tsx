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
        {/* <path
          d="M65.9658 27.487C65.9658 42.4618 52.326 51.1841 35.5004 51.1841C14.7114 50.657 6.06526 42.6362 5.03495 27.487C5.03495 12.5121 18.6748 3.81608 35.5004 3.81608C52.326 3.81608 65.9658 12.5121 65.9658 27.487Z"
          fill="#0CC0B5"
        />
        <mask
          id="mask0_5_39"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="5"
          y="3"
          width="61"
          height="49"
        >
          <path
            d="M65.9658 27.487C65.9658 42.4618 52.326 51.1841 35.5004 51.1841C14.7114 50.657 6.06526 42.6362 5.03495 27.487C5.03495 12.5121 18.6748 3.81608 35.5004 3.81608C52.326 3.81608 65.9658 12.5121 65.9658 27.487Z"
            fill="#0CC0B5"
          />
        </mask>
        <g mask="url(#mask0_5_39)">
          <rect
            opacity="0.5"
            width="21.5315"
            height="115.997"
            transform="matrix(0.727809 0.685779 -0.684407 0.7291 39.5469 -18.6648)"
            fill="#02B0A7"
          />
          <rect
            opacity="0.5"
            width="21.5315"
            height="115.997"
            transform="matrix(0.727809 0.685779 -0.684407 0.7291 72.6852 12.5597)"
            fill="#07B8AE"
          />
          <rect
            opacity="0.5"
            width="21.5315"
            height="115.997"
            transform="matrix(0.727809 0.685779 -0.684407 0.7291 105.823 43.7843)"
            fill="#02B0A7"
          />
        </g> */}
      </svg>
      <div className="relative z-10">{children}</div>
    </button>
  );
}
