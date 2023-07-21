import { useCallback } from "react";
import { configure, getStorybookUI } from "@storybook/react-native";
import { loadStories } from "./story-loader";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { View } from "react-native";

SplashScreen.hideAsync();

configure(() => loadStories(), module);
const StorybookUIRoot = getStorybookUI({
  port: 4400,
  onDeviceUI: true,
});

const App = () => {
  const [loaded] = useFonts({
    WorkSans: require("../assets/fonts/WorkSans.ttf"),
  });

  const onLayoutRoot = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRoot}>
      <StorybookUIRoot />
    </View>
  );
};

export default App;
