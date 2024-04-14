import { View, Text } from "react-native";
import { inProgressStyles } from "../styles/dashboard.styles";
import Task from "./Task";

const InProgress = ({ taskSources, updateBadges, updateUserBadges, updateGold }) => {
  return (
    <View style={inProgressStyles.outerContainer}>
      <Text>In Progress</Text>
      <View style={inProgressStyles.imageContainer}>
        <Task taskSources={taskSources} updateBadges={updateBadges} updateUserBadges={updateUserBadges} updateGold={updateGold}/>
      </View>
    </View>
  );
};

export default InProgress;
