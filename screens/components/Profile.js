import { Text, View, Image } from "react-native";
import source from "../../assets/user.jpeg";
import coin_icon from "../../assets/coin_icon.png";
import LineProgressBar from "./LineProgressBar";
import { profileStyles } from "../styles/dashboard.styles";
import { profilePhotoStyles } from "../styles/dashboard.styles";
import { levelProgressStyles } from "../styles/dashboard.styles";
import * as Progress from 'react-native-progress';

const Profile = ({usrLvl, progressVal, gold}) => {
  return (
    <View style={profileStyles.container}>
      <View style={profilePhotoStyles.container}>
        <Image source={source} style={profilePhotoStyles.image} />
      </View>
      <Text style={profileStyles.personName}>Person1</Text>
      <View style={levelProgressStyles.container}>
        <Text style={levelProgressStyles.text}>{usrLvl}</Text>
        <View style={levelProgressStyles.progressBar}>
          <Progress.Bar progress={progressVal} size={50} color='white'/>
        </View>
      </View>
      <View style={profileStyles.scoreContainer}>
        <Image source={coin_icon} style={profileStyles.coinIcon} />
        <Text style={profileStyles.scoreText}>{gold}</Text>
      </View>
    </View>
  );
};

export default Profile;
