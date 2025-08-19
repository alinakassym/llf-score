import React from 'react';
import { Pressable, View, Text, PressableProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = PressableProps & {
    name: React.ComponentProps<typeof Ionicons>['name'];
    size?: number;
    color?: string;
    dot?: boolean;            // small red dot
    badgeCount?: number;      // number (displays a circle with the number)
};

export default function IconButton({
  name,
  size = 22,
  color = '#111',
  dot,
  badgeCount,
  style,
  ...rest
}: Props) {
  const showBadge = typeof badgeCount === 'number' && badgeCount > 0;

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', position: 'relative' },
        { opacity: pressed ? 0.6 : 1 },
        style as any,
      ]}
      hitSlop={8}
      android_ripple={{ radius: 20 }}
      accessibilityRole="button"
    >
      <Ionicons name={name} size={size} color={color} />
      {dot && !showBadge ? (
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
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
