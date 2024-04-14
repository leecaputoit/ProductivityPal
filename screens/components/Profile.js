import { Text, View, Image } from "react-native";
import source from "../../assets/user.jpeg";
import coin_icon from "../../assets/coin_icon.png";
import LineProgressBar from "./LineProgressBar";
import { profileStyles } from "../styles/dashboard.styles";
import { profilePhotoStyles } from "../styles/dashboard.styles";
import { levelProgressStyles } from "../styles/dashboard.styles";

const Profile = () => {
  return (
    <View style={profileStyles.container}>
      <View style={profilePhotoStyles.container}>
        <Image source={source} style={profilePhotoStyles.image} />
      </View>
      <Text style={profileStyles.personName}>Person1</Text>
      <View style={levelProgressStyles.container}>
        <Text style={levelProgressStyles.text}>LV. 00</Text>
        <View style={levelProgressStyles.progressBar}>
          <LineProgressBar />
        </View>
      </View>
      <View style={profileStyles.scoreContainer}>
        <Image source={coin_icon} style={profileStyles.coinIcon} />
        <Text style={profileStyles.scoreText}>2000</Text>
      </View>
    </View>
  );
};

export default Profile;
