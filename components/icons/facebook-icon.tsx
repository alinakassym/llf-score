import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FacebookIconProps extends SvgProps {
  size?: number;
}

export function FacebookIcon({ size = 21, ...props }: FacebookIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 21" {...props}>
      <Path
        d="M21.0338 10.3741C21.0338 4.80985 16.523 0.299128 10.9588 0.299128C5.39451 0.299128 0.883789 4.80985 0.883789 10.3741C0.883789 15.4028 4.56807 19.5709 9.38456 20.3267V13.2864H6.82646V10.3741H9.38456V8.15447C9.38456 5.62943 10.8887 4.23467 13.19 4.23467C14.2923 4.23467 15.4453 4.43145 15.4453 4.43145V6.91084H14.1749C12.9233 6.91084 12.533 7.68746 12.533 8.48421V10.3741H15.3272L14.8806 13.2864H12.533V20.3267C17.3495 19.5709 21.0338 15.4028 21.0338 10.3741Z"
        fill="white"
      />
    </Svg>
  );
}
