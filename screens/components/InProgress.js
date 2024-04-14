import { View, Text } from "react-native";
import { inProgressStyles } from "../styles/dashboard.styles";
import Task from "./Task";

const InProgress = ({ imageSources }) => {
  return (
    <View style={inProgressStyles.outerContainer}>
      <Text>In Progress</Text>
      <View style={inProgressStyles.imageContainer}>
        <Task />
      </View>
    </View>
  );
};

export default InProgress;
