import React from 'react';
import { Pressable, View, Text, PressableProps, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeMode } from '@/shared/theme/useThemeMode';

type Props = PressableProps & {
    name: React.ComponentProps<typeof Ionicons>['name'];
    size?: number;          // icon size
    buttonSize?: number;    // button size (width/height)
    variant?: 'ghost' | 'filled';
    rounded?: boolean;      // rounding: true = circular
    color?: string;         // override icon color
    bgColor?: string;       // override background color
    dot?: boolean;          // small red dot
    badgeCount?: number;    // number in the badge
};

export default function IconButton({
  name,
  size = 22,
  buttonSize = 36,
  variant = 'ghost',
  rounded = true,
  color,
  bgColor,
  dot,
  badgeCount,
  style,
  ...rest
}: Props) {
  const scheme = useThemeMode(); // 'light' | 'dark'
  const isLight = scheme === 'light';

  // автоподбор цветов от темы
  const iconColor = color ?? (isLight ? '#111' : '#FFFFFF');
  const containerBg =
    variant === 'filled'
      ? bgColor ?? (isLight ? '#F2F3F5' : 'rgba(255,255,255,0.08)')
      : 'transparent';
  const borderColor = isLight ? '#E6E8EB' : 'rgba(255,255,255,0.14)';

  const showBadge = typeof badgeCount === 'number' && badgeCount > 0;

  return (
    <Pressable
      {...rest}
      hitSlop={8}
      android_ripple={Platform.OS === 'android' ? { radius: buttonSize / 2 } : undefined}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          width: buttonSize,
          height: buttonSize,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: rounded ? buttonSize / 2 : 12,
          backgroundColor: containerBg,
          // лёгкий контур для контраста в светлой теме
          borderWidth: variant === 'filled' ? 0 : 0,
          borderColor,
          opacity: pressed ? 0.7 : 1,
        },
        style as any,
      ]}
    >
      <Ionicons name={name} size={size} color={iconColor} />

      {dot && !showBadge ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 2,
            width: 8,
            height: 8,
            borderRadius: 10,
            backgroundColor: '#FF3B30',
          }}
        />
      ) : null}

      {showBadge ? (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            minWidth: 16,
            height: 16,
            paddingHorizontal: 4,
            borderRadius: 10,
            backgroundColor: '#FF3B30',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}