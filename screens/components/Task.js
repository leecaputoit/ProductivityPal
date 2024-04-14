import { View, Image, Text, TouchableOpacity } from "react-native";
import { inProgressStyles } from "../styles/dashboard.styles";
import { profileStyles } from "../styles/dashboard.styles";
import coin_icon from "../../assets/coin_icon.png";
import { retrieve, save } from "../../utils/utility";

const Task = ({taskSources, updateBadges, updateUserBadges, updateGold}) => {

  
  let purchaseBadge = async (badgeId, goldReq) => {
    // don't let user purchase if not enough gold
    let userGold = Number(await retrieve('gold'));
    if(userGold < Number(goldReq)){
      alert('Not enough gold');
      return;
    }

    // deduct the gold required by the badge
    userGold = userGold - Number(goldReq);
    await save('gold', userGold);
    // get both the badges available to purchase and the badges that the user owns
    let a_badges = JSON.parse(await retrieve('a_badges'));
    let userBadges = JSON.parse(await retrieve('badges'));
    // get the badge the user is trying to purchase
    let badge = a_badges.filter((b) => b.id == badgeId)[0];
    // remove the badge that the user is trying to purchase from available badges
    a_badges = a_badges.filter((b) => b.id != badgeId);
    // add the badge that the user is trying to purchase to the user owned badges arrary
    userBadges.push(badge.image);
    // save the respective badge arrays
    await save('a_badges', a_badges);
    await save('badges', userBadges);
    // update the UI
    updateBadges(a_badges);
    updateUserBadges(userBadges);
    updateGold(userGold);
  }
  
  return (
    <View> 
      {
      taskSources.length > 0 ?
        taskSources?.map((source, index) => (
          <View style={inProgressStyles.taskContainer} key={index}>
            <Image
              key={index}
              source={source.image}
              style={inProgressStyles.image}
            />
            <View style={{...inProgressStyles.detailContainer, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text
                style={inProgressStyles.detailContainerText}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {source.name}
              </Text>
              <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.5, padding: '1%', borderRadius: 10}} onPress={() => {purchaseBadge(source.id, source.val)}}>
                <Image source={coin_icon} style={profileStyles.coinIcon} />
                <Text style={{...inProgressStyles.scoreText, alignSelf: 'center'}}>{source.val}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
        :
        <Text style={{alignSelf:'center'}}> No Badges Available </Text>
      
      }

    </View>
  );
}

export default Task;
