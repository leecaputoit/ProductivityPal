import { ScrollView, View } from "react-native";
import Profile from "./components/Profile";
import Badge from "./components/Badge";
import InProgress from "./components/InProgress";

export default function DashboardScreen({}) {
  const imageSources = [
    require("../assets/yellow_badge.jpeg"),
    require("../assets/yellow_badge.jpeg"),
    require("../assets/yellow_badge.jpeg"),
    require("../assets/yellow_badge.jpeg"),
  ];
  return (
    <ScrollView>
      <Profile />
      <Badge imageSources={imageSources} />
      <InProgress />
    </ScrollView>
  );
}
