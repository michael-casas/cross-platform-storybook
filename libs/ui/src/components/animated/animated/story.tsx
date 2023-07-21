import { useRef } from "react";
import {
  Canvas,
  useTouchHandler,
  SkiaDomView,
  Circle,
} from "@shopify/react-native-skia";

export const AnimatedStory = () => {
  const ref = useRef<SkiaDomView>(null);
  const onTouch = useTouchHandler({
    onEnd: () => {
      console.log("ending");
    },
  });
  return (
    <Canvas
      style={{
        width: 275,
        height: 275,
      }}
      ref={ref}
      onTouch={onTouch}
    >
      <Circle r={100} cx={100} cy={100} color={"red"} />
    </Canvas>
  );
};
