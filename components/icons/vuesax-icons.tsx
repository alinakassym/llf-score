import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface VuesaxIconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string; // для fill-иконок
  stroke?: string; // для stroke-иконок
  strokeWidth?: number; // опционально
  className?: string;
}

type IconRenderProps = {
  color: string;
  stroke?: string;
  strokeWidth?: number;
};

type IconDef = {
  viewBox: string;
  paths: (p: IconRenderProps) => React.ReactNode;
};

const icons: Record<string, IconDef> = {
  "chevron-down": {
    viewBox: "0 0 24 24",
    paths: ({ stroke }) => (
      <>
        <Path
          d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
          stroke={stroke ?? "currentColor"}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
        />
      </>
    ),
  },
  chevron: {
    viewBox: "0 0 16 16",
    paths: ({ color }) => (
      <>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.52729 6.07523C3.78764 5.81488 4.20975 5.81488 4.4701 6.07523L7.9987 9.60383L11.5273 6.07523C11.7876 5.81488 12.2098 5.81488 12.4701 6.07523C12.7305 6.33558 12.7305 6.75769 12.4701 7.01804L8.4701 11.018C8.20975 11.2784 7.78764 11.2784 7.52729 11.018L3.52729 7.01804C3.26694 6.75769 3.26694 6.33558 3.52729 6.07523Z"
          fill={color ?? "currentColor"}
        />
      </>
    ),
  },
};

export const VuesaxIcon: FC<VuesaxIconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  stroke,
  strokeWidth,
  className,
}) => {
  const icon = icons[name];
  if (!icon) {
    console.warn(`VuesaxIcon "${name}" not found`);
    return null;
  }
  return (
    <Svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill={color} // для fill-иконок
      className={className}
    >
      {icon.paths({ color, stroke, strokeWidth })}
    </Svg>
  );
};
