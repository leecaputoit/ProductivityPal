import { View, Image, Text } from "react-native";
import { inProgressStyles } from "../styles/dashboard.styles";
import { profileStyles } from "../styles/dashboard.styles";
import coin_icon from "../../assets/coin_icon.png";

const Task = ({}) => {
  const taskSources = [
    {
      image: require("../../assets/yellow_badge.jpeg"),
      name: "15 days consecutive task completion",
    },
    {
      image: require("../../assets/yellow_badge.jpeg"),
      name: "Purchase with 5000 coins",
    },
    {
      image: require("../../assets/yellow_badge.jpeg"),
      name: "Purchase with 5000 coins",
    },
  ];
  return (
    <View>
      {taskSources?.map((source, index) => (
        <View style={inProgressStyles.taskContainer} key={index}>
          <Image
            key={index}
            source={source.image}
            style={inProgressStyles.image}
          />
          <View style={inProgressStyles.detailContainer}>
            <Text
              style={inProgressStyles.detailContainerText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {source.name}
            </Text>
            <View style={inProgressStyles.scoreContainer}>
              <Image source={coin_icon} style={profileStyles.coinIcon} />
              <Text style={inProgressStyles.scoreText}>2000</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Task;
