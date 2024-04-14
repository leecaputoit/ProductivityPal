import { ScrollView, View } from "react-native";
import Profile from "./components/Profile";
import Badge from "./components/Badge";
import InProgress from "./components/InProgress";
import { save, retrieve, clearStorage, toTimeString, calcUsrLvl, initUsrStats, calcLvlUpProgress } from '../utils/utility';
import { useEffect, useState } from "react";

export default function DashboardScreen({route, navigation}) {

  const [progressVal, setProgressVal] = useState(0);
  const [userGold, setUserGold] = useState(0);
  const [userLevel, setUserLevel] = useState('LV.???');
  const [userBadges, setUserBadges] = useState([require("../assets/yellow_badge.jpeg")]);
  const [avBadges, setAvBadges] = useState([]);

  let getUsrStats = async () => {
    await initUsrStats();
    let lvl = await calcUsrLvl();
    setUserLevel('LV.' + lvl);
    let progress = await calcLvlUpProgress();
    setProgressVal(Number(progress));
    let gold = await retrieve('gold');
    if(gold != null){
        setUserGold(Number(gold));
    }
    let badges = await retrieve('badges');
    setUserBadges(JSON.parse(badges));
    let a_badges = await retrieve('a_badges');
    setAvBadges(JSON.parse(a_badges));
  }

  useEffect(
    () => {
      const unsub = navigation.addListener('focus', () => {
        getUsrStats();
      })

      return unsub;
    }, []
  );

  return (
    <ScrollView>
      <Profile usrLvl={userLevel} gold={userGold} progressVal={progressVal}/>
      <Badge imageSources={userBadges} />
      <InProgress taskSources={avBadges} updateBadges={setAvBadges} updateUserBadges={setUserBadges} updateGold={setUserGold}/>
    </ScrollView>
  );
}
