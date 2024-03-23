import {Dimensions, StyleSheet, Text, View, FlatList, ToastAndroid} from 'react-native';
import { Button } from '@rneui/themed';
import React, {useState, useRef, useEffect} from 'react';
import CalendarPicker from "react-native-calendar-picker";
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { save, retrieve, clearStorage } from '../utils/utility';

export default function HomeScreen({navigation}) {
    const [dateSelected, setDateSelected] = useState(new Date().toDateString());
    const [userLevel, setUserLevel] = useState('LV.0');
    const [tasks, setTasks] = useState([]);

    let getUsrLvl = async () => {
        let usrLvl = await retrieve('level');
        if(usrLvl != null){
            setUserLevel('LV.' + usrLvl);
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

    useEffect(() => {
        // ensure that the home page is re-rendered when returning from an AddTask page
        navigation.addListener(
            'focus',
            payload => {
                ToastAndroid.show(dateSelected, ToastAndroid.SHORT)
                getUsrLvl();
                getTaskList();
            }
        )

        getTaskList();
    }, [dateSelected])

    let taskItem = (item) => (
        <View style={styles.taskItemStyles}>
            <Text>{item.taskDesc}</Text>
            <Text>placeholder</Text>
        </View>
    )

    //dummy function for adding placeholder tasks
    let addTask = () =>{
        setTasks([...tasks, {id: Math.random() * 1000}])
    }

    return (
        <View style={styles.container}>   
            <View style={styles.topBannerContainerStyle}> 
                <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginLeft: '5%', marginTop: '2%'}}
                >{
                    userLevel
                }</Text>
                <View style={styles.topBanner1}>
                    <Progress.Circle 
                        size={120} 
                        progress={0.75} 
                        color='white'
                        showsText
                        thickness={5}
                        formatText={() => '75%'}
                        style={{marginLeft: '7%', marginTop: '2%'}}
                    />
                    <Text
                        style={{width: '45%', fontSize: 30, color: 'white', marginRight: '2%'}}
                    >Finish more tasks to advance to the next level!</Text>
                </View>
            </View>
            <View style={styles.calendarContainerStyle}>
                <CalendarPicker 
                    todayBackgroundColor='#2fd281'
                    onDateChange={date => {
                        setDateSelected(date.toDateString());
                    }}
                    selectedDayColor='white'
                    height={Dimensions.get('window').height * 0.45}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomTitleContainer}>
                    <Text style={{
                            fontSize: 20, 
                            color: '#2fd281', 
                            paddingTop: '2%', 
                            fontWeight: 'bold',
                        }}>
                        {dateSelected ? dateSelected : new Date().toDateString()}
                    </Text>
                    <Button
                        icon={<Icon name="format-list-bulleted-add" size={20} color='white' />}
                        buttonStyle={{backgroundColor: '#2fd281'}}
                        onPress={() => navigation.navigate('AddTask', {date: dateSelected})}
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
      marginBottom: '6%'
    },
    topBannerContainerStyle: {
        borderRadius: 25,
        backgroundColor: '#2fd281',
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
        justifyContent: 'flex-end'
        
    }
    ,
    bottomTitleContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: '5%',
        marginRight: '5%',
    },
    taskListStyles: {
        flexGrow: 2,
        marginTop: '2%'
        
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
        backgroundColor: 'white'
    }
  });
  