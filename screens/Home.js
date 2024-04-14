import {Dimensions, StyleSheet, Text, View, FlatList, ToastAndroid, TouchableOpacity, Image} from 'react-native';
import { Button } from '@rneui/themed';
import React, {useState, useRef, useEffect} from 'react';
import CalendarPicker from "react-native-calendar-picker";
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { save, retrieve, clearStorage, toTimeString, calcUsrLvl, initUsrStats, calcLvlUpProgress } from '../utils/utility';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import coin_icon from "../assets/coin_icon.png";
import { profileStyles } from "./styles/dashboard.styles";
import { APP_MAIN_BG_COLOR } from '../utils/constants';

export default function HomeScreen({route, navigation}) {
    let getTodayDateString = () => {
        let today = new Date();
        let todayDate = '' + today.getDate();
        let todayMonth = (today.getMonth() + 1) + '';

        if(todayDate.length == 1){
            todayDate = '0' + todayDate;
        }
        if(todayMonth.length == 1){
            todayMonth = '0' + todayMonth;
        }

        return today.getFullYear() + '-' + todayMonth + '-' + todayDate;
    } 

    const [dateSelected, setDateSelected] = useState(getTodayDateString());
    const [userLevel, setUserLevel] = useState('LV.???');
    const [tasks, setTasks] = useState([]);
    const [markedDates, setMarkedDates] = useState({[dateSelected]: {selected: true}})
    const [progressVal, setProgressVal] = useState(0);
    const [userGold, setUserGold] = useState(0);

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
    }

    let getTaskList = async () => {
        let taskList = await retrieve(dateSelected);
        // if it exists, we update the tasks variable
        if(taskList != null){
            // de-serialize the task list from storage
            taskList = JSON.parse(taskList);
            setTasks(taskList);
        }else{
            setTasks([]);
        }
    }

    let markDate = async (date) => {
        let taskList = await retrieve(dateSelected);
        // if it exists, we check if it is not empty
        if(taskList != null){
            // de-serialize the task list from storage
            taskList = JSON.parse(taskList);
            if(taskList.length > 0){
                // since the current date has one or more tasks in it, we mark it with a dot
                // have to update markedDates object
                let temp = {...markedDates}
                temp[date]['marked'] = true;
                setMarkedDates(temp);
            }else{
                // since the current date's task list is empty, we remove the dot if it's marked
                let temp = {...markedDates}
                temp[date]['marked'] = false;
                setMarkedDates(temp);
            }
        }
    }

    // so that user level and task list contents are updated whenever the home screen is focused
    useEffect(
        () => {
           getUsrStats();
           getTaskList();
           markDate(dateSelected);
        }, [route]
      );

      useEffect(
        () => {
          const unsub = navigation.addListener('focus', () => {
            getUsrStats();
          })
    
          return unsub;
        }, []
      );

    useEffect(() => {
        getTaskList();
    }, [dateSelected])

    let taskItem = (item) => {
        let time = new Date(item.time);
        return (
            <TouchableOpacity 
                style={styles.taskItemStyles}
                onPress={() => {
                    navigation.navigate('Edit Task', {task: item});
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Icon name="radio-button-unchecked" size={15} color={APP_MAIN_BG_COLOR} style={{marginRight: '10%', alignSelf:'center'}}/>
                    <Text style={{fontSize: 17}}>{item.taskDesc}</Text>
                </View>
                <Text style={{color: APP_MAIN_BG_COLOR, fontSize: 17}}>{toTimeString(time)}</Text>
            </TouchableOpacity>
            )
    }

    return (
        <View style={styles.container}>   
            <View style={styles.topBannerContainerStyle}> 
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text
                        style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: '5%', marginTop: '2%'}}
                    >{
                        userLevel
                    }</Text>
                    <View style={{flexDirection:'row'}}>
                        <Image source={coin_icon} style={{...profileStyles.coinIcon, alignSelf: 'center'}} />
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginRight: '3%', marginTop: '2%', alignSelf: 'center'}}>{' ' + userGold}</Text>
                    </View>
                </View>
                <View style={styles.topBanner1}>
                    <Progress.Circle 
                        size={120} 
                        progress={progressVal} 
                        color='white'
                        showsText
                        thickness={5}
                        formatText={() => Math.floor(progressVal * 100) + '%'}
                        style={{marginLeft: '7%', marginTop: '2%'}}
                    />
                    <Text
                        style={{width: '50%', fontSize: 30, color: 'white', marginRight: '2%'}}
                    >Finish more tasks to advance to the next level!</Text>
                </View>
            </View>
            <View style={styles.calendarContainerStyle}>
                {/* <CalendarPicker 
                    todayBackgroundColor=APP_MAIN_BG_COLOR
                    onDateChange={date => setDateSelected(date.toDateString())}
                    height={Dimensions.get('window').height * 0.45}
                    selectedDayColor='transparent'
                /> */}
                <Calendar 
                    onDayPress={day => {
                        let prevSelected = dateSelected;
                        setDateSelected(day.dateString);
                        // update markedDates array so that the currently selected is highlighted
                        let temp = {...markedDates};
                        if(prevSelected != undefined){
                            delete temp[prevSelected]['selected'];
                        }
                        if(temp[day.dateString] != undefined){
                            temp[day.dateString]['selected'] = true;
                        }else{
                            temp[day.dateString] = {selected: true};
                        }
                        setMarkedDates(temp);
                      }}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: APP_MAIN_BG_COLOR,
                        selectedDayBackgroundColor: APP_MAIN_BG_COLOR,
                        selectedDayTextColor: '#ffffff',
                        selectedDotColor: '#ffffff',
                        dotColor: '#00adf5',
                        arrowColor: APP_MAIN_BG_COLOR,
                    }}
                    markedDates={markedDates}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomTitleContainer}>
                    <Text style={{
                            fontSize: 20, 
                            color: APP_MAIN_BG_COLOR, 
                            paddingTop: '2%', 
                            fontWeight: 'bold',
                        }}>
                        {dateSelected ? dateSelected : new Date().toDateString()}
                    </Text>
                    <Button
                        icon={<Icon name="format-list-bulleted-add" size={20} color='white' />}
                        buttonStyle={{backgroundColor: APP_MAIN_BG_COLOR}}
                        onPress={() => navigation.navigate('Add Task', {date: dateSelected})}
                    />
                </View>
                <View style={styles.taskListStyles}>
                    {tasks.length > 0 ? 
                        <FlatList
                            style={{
                               
                            }}
                            data={tasks}
                            renderItem={({item}) => taskItem(item)}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 15,
                            color: 'gray'
                        }}> No tasks planned </Text>
                    }
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: '10%'
    },
    calendarContainerStyle: {
      marginBottom: '1%'
    },
    topBannerContainerStyle: {
        borderRadius: 25,
        backgroundColor: APP_MAIN_BG_COLOR,
        width: '95%',
        height: '25%',
        marginBottom: '3%',
        alignSelf: 'center'
    },
    topBanner1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent:'space-between'
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        
    }
    ,
    bottomTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: '5%',
        marginRight: '5%',
    },
    taskListStyles: {
        flexGrow: 2,
        marginTop: '2%',
        justifyContent: 'center',
        height: '20%'
        
    },
    taskItemStyles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 15,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        marginBottom: '5%',
        elevation: 5,
        shadowColor: '#52006A',
        backgroundColor: 'white',

    }
  });
  