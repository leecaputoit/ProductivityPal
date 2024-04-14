import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Button } from '@rneui/themed';
import { addExp, addGold } from '../utils/utility';
import { APP_MAIN_BG_COLOR } from '../utils/constants';

export default function TaskCompletionScreen({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Icon name="flag" size={150} color='white' style={{marginBottom: '10%'}}/>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white', marginBottom: '2%'}}>Congratulations!</Text>
            <Text style={{fontSize: 25,fontWeight: 'bold', color: 'white', marginBottom: '5%'}}>You just completed the task</Text>
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold', 
                color: 'white', 
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius:10,
                marginBottom: '5%'
            }}>{route.params.taskDesc}</Text>
            <Text style={{fontSize: 25,fontWeight: 'bold', color: 'white', marginBottom:'2%'}}>
                You have earned:
            </Text>
            <Text style={{fontSize: 25,fontWeight: 'bold', color: 'white'}}><Text style={{color: '#ffd700'}}>20</Text> EXP</Text>
            <Text style={{fontSize: 25,fontWeight: 'bold', color: 'white'}}><Text style={{color: '#ffd700'}}>20</Text> Coins</Text>
            <Button  
                    type='solid'
                    onPress={() => {
                        navigation.navigate('Home', {workaround: true})
                    }}
                    containerStyle={{marginTop: '30%'}}
                    buttonStyle={{paddingVertical:'5%', paddingHorizontal: '20%'}}
                    color='white'
                    radius='lg'
                    titleStyle={{color:APP_MAIN_BG_COLOR, fontWeight: 'bold', fontSize: 20}}
            >
                OK
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: APP_MAIN_BG_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });