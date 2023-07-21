import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { Svg, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedProps,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const circleRadius = 150; // Increased circle radius for better visibility

const AnimatedCircleComponent = () => {
  const fill = useSharedValue('#fff');
  const progress = useSharedValue(0);

  const props = useAnimatedProps(() => {
    return { fill: fill.value };
  });

  const style = useAnimatedStyle(() => {
    const x = circleRadius * Math.cos(2 * Math.PI * progress.value);
    const y = circleRadius * Math.sin(2 * Math.PI * progress.value);

    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  useEffect(() => {
    progress.value = withTiming(
      1,
      {
        duration: 2000,
        easing: Easing.linear,
      },
      (isFinished) => {
        if (isFinished) {
          progress.value = 0;
        }
      }
    );

    const interval = setInterval(() => {
      fill.value = withTiming(fill.value === '#fff' ? '#000' : '#fff', {
        duration: 1000,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Animated.View style={style}>
      <Svg width="100px" height="100px">
        <AnimatedCircle cx="50%" cy="50%" r="50" animatedProps={props} />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: window.innerHeight,
    width: window.innerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'red',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function AnimationCircle() {
  return (
    <View style={styles.container}>
      <AnimatedCircleComponent />
    </View>
  );
}
