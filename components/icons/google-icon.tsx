import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface GoogleIconProps extends SvgProps {
  size?: number;
}

export function GoogleIcon({ size = 21, ...props }: GoogleIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2003 10.5418C20.2003 9.82737 20.1362 9.14044 20.0171 8.48099H10.5283V12.3782H15.9505C15.7169 13.6376 15.0071 14.7046 13.9401 15.419V17.9469H17.1961C19.1012 16.1929 20.2003 13.6101 20.2003 10.5418Z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5283 20.3878C13.2485 20.3878 15.5291 19.4856 17.1961 17.9469L13.94 15.419C13.0379 16.0235 11.8838 16.3807 10.5283 16.3807C7.9042 16.3807 5.68313 14.6084 4.89087 12.227H1.5249V14.8374C3.1827 18.13 6.58988 20.3878 10.5283 20.3878Z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8907 12.227C4.6892 11.6225 4.57471 10.9768 4.57471 10.3127C4.57471 9.6487 4.6892 9.00299 4.8907 8.39849V5.78815H1.52474C0.842386 7.14827 0.453125 8.687 0.453125 10.3127C0.453125 11.9385 0.842386 13.4772 1.52474 14.8373L4.8907 12.227Z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5283 4.24483C12.0075 4.24483 13.3355 4.75316 14.3797 5.7515L17.2694 2.86181C15.5246 1.23607 13.244 0.237732 10.5283 0.237732C6.58988 0.237732 3.1827 2.49545 1.5249 5.78814L4.89087 8.39847C5.68313 6.01711 7.9042 4.24483 10.5283 4.24483Z"
        fill="#EA4335"
      />
    </Svg>
  );
}
