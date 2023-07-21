import { PropsWithChildren } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default function Centered({ children }: PropsWithChildren) {
  return <View style={styles.centered}>{children}</View>;
}

const styles = StyleSheet.create({
  // @ts-expect-error platform specific style for web
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        height: '100vh',
      },
    }),
  },
});
