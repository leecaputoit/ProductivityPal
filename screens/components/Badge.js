import { View, Image, Text } from "react-native";
import { badgeStyles } from "../styles/dashboard.styles";

const Badge = ({ imageSources }) => {
  return (
    <View style={badgeStyles.outerContainer}>
      <Text>Badges</Text>
      <View style={badgeStyles.imageContainer}>
        {imageSources?.map((source, index) => (
          <Image key={index} source={source} style={badgeStyles.image} />
        ))}
      </View>
    </View>
  );
};

export default Badge;
