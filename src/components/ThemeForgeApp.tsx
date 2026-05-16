import { useThemeStore } from "@/stores/themeStore";
import StartScreen from "./StartScreen";
import GenerationScreen from "./GenerationScreen";
import ResultScreen from "./ResultScreen";
import ModifyScreen from "./ModifyScreen";

export default function ThemeForgeApp() {
  const { screen } = useThemeStore();

  switch (screen) {
    case "start":
      return <StartScreen />;
    case "generating":
      return <GenerationScreen />;
    case "result":
      return <ResultScreen />;
    case "modify":
      return <ModifyScreen />;
    default:
      return <StartScreen />;
  }
}
