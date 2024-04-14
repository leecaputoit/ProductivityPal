import { StyleSheet, Text, ToastAndroid, View, Alert } from 'react-native';
import { Input } from '@rneui/themed'
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useRef, useEffect} from 'react';
import { Button } from '@rneui/themed'
import { save, retrieve, toTimeString, addExp, addGold } from '../utils/utility';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { APP_MAIN_BG_COLOR } from '../utils/constants';

export default function AddTaskScreen({ route, navigation }) {
    let task = route.params.task;

    const [taskDesc, setTaskDesc] = useState(task.taskDesc);
    const [location, setLocation] = useState(task.location);
    const [timePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState(task.time);
    const [timeResultVisible, setTimeResultVisibility] = useState(true);
    const [timeResult, setTimeResult] = useState(new Date(task.time).getHours() + ':' + new Date(task.time).getMinutes());
    const [openDDP, setOpenDDP] = useState(false);
    const [repeatSetting, setRepeatSetting] = useState(task.repeatSetting);
    const [ddpItems, setDDPItems] = useState([
        {label: 'Don\'t repeat (notfies an hour before deadline)', value: '0'},
        {label: 'Every hour', value: '1'},
        {label: 'Every day', value: '2'},
        {label: 'Every week', value: '3'}
    ]);
    const [notes, setNotes] = useState(task.notes);

    let saveTask = async () => {
        if(taskDesc.length === 0){
            Alert.alert('Missing required field(s)', 'Task description is required');
        }else if(!time){
            Alert.alert('Missing required field(s)', 'Task deadline is required');
        }else if(repeatSetting.length === 0){
            Alert.alert('Missing required field(s)', 'Repeat setting is required');
        }else{
            // make a new task object with updated values
            let updatedTask = {
                id: task.id,
                taskDesc: taskDesc,
                location: location,
                time: time,
                repeatSetting: repeatSetting,
                notes: notes,
                date: task.date
            }
    
            // get the task list associated with the current date 
            let curTaskList = await retrieve(task.date);
            // if it exists, we remove the orginal task from the list and add this one to it
            if(curTaskList != null){
                // de-serialize the task list
                curTaskList = JSON.parse(curTaskList);
                // remove the original task from the list by filtering
                let filteredList = curTaskList.filter(function(value, index, arr){
                    return value.id != task.id;
                })
                // add our updated task
                filteredList.push(updatedTask);
                // save the updated task list to storage
                await save(task.date, JSON.stringify(filteredList));
            }else{
                // if it doesn't exist, we create a new list and save it with the new task
                // technically shouldn't be possible
                let taskList = [updatedTask];
                await save(task.date, JSON.stringify(taskList))
            }
    
            navigation.navigate('Home', {workaround: true});
        }
    }

    let deleteTask = async (returnToHome) => {
        // get the task list associated with the current date 
        let curTaskList = await retrieve(task.date);
        // if it exists, we remove the orginal task from the list
        if(curTaskList != null){
            // de-serialize the task list
            curTaskList = JSON.parse(curTaskList);
            // remove the original task from the list by filtering
            let filteredList = curTaskList.filter(function(value, index, arr){
                return value.id != task.id;
            })
            // save the updated task list to storage
            await save(task.date, JSON.stringify(filteredList));
        }

        navigation.navigate('Home', {workaround: true});
    }

    let markComplete = async () => {
        let taskName = taskDesc;
        // delete the task first
        await deleteTask();
        // add task completion rewards
        await addExp(20);
        await addGold(20);
        // show the task completion screen
        navigation.navigate('Task Completion', {taskDesc: taskName});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{task.date}</Text>
            <Input 
                value={taskDesc}
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="event-note" size={20} color={APP_MAIN_BG_COLOR} style={{paddingTop: '5%'}}/>}
                onChangeText={value => setTaskDesc(value)}
            />
            <Input 
                value={location}
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="location-on" size={20} color={APP_MAIN_BG_COLOR} style={{paddingTop: '5%'}}/>}
                onChangeText={value => setLocation(value)}
            />

            <Input 
                value={notes}
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="note-alt" size={20} color={APP_MAIN_BG_COLOR} style={{paddingTop: '5%'}}/>}
                onChangeText={value => setNotes(value)}
            />
           
            <Button
                type='outline'
                titleStyle={{color:APP_MAIN_BG_COLOR, fontSize: 20}}
                icon={<Icon name="schedule" size={25} color={APP_MAIN_BG_COLOR} />}
                containerStyle={{marginTop: '5%', width: '90%', alignSelf: 'center', borderWidth: 1.5, borderColor: APP_MAIN_BG_COLOR, borderRadius: 15}}
                buttonStyle={{paddingVertical: '3%'}}
                onPress={() => {setTimePickerVisibility(!timePickerVisible)}}
            >
                Set Task Deadline
            </Button>
            {
                timePickerVisible && 
                <DateTimePicker 
                    mode='time' 
                    value={new Date()} 
                    is24Hour={true}
                    onChange={(event, date) => {
                        const {type, x} = event;
                        if(type === 'set'){
                            setTimePickerVisibility(false)
                            setTimeResult(toTimeString(date));
                            setTimeResultVisibility(true);
                            setTime(date.toJSON());
                        }else{
                            setTimePickerVisibility(false)
                        }
                    }}
                />
            }   

            {
                timeResultVisible &&
                <Text style={{fontSize: 25, alignSelf: 'center', marginTop: '3%', color: APP_MAIN_BG_COLOR}}>Deadline Set: <Text style={{fontWeight: 'bold'}}>{timeResult}</Text></Text>
            }

            <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: '7%'}}> 
                <Icon name="repeat" size={25} color={APP_MAIN_BG_COLOR} style={{paddingTop: '3%', paddingRight: '1%'}}/>
                <DropDownPicker
                    open={openDDP}
                    value={repeatSetting}
                    items={ddpItems}
                    setOpen={setOpenDDP}
                    setValue={setRepeatSetting}
                    setItems={setDDPItems}
                    containerStyle={{width: '90%'}}
                    style={{backgroudnColor: APP_MAIN_BG_COLOR}}
                    placeholder='Select a repeat setting (repeatedly notify the user until deadline)'
                    zIndex={0}
                />
            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end', marginTop: 'auto', width: '100%'}}>
                <Button 
                    type='solid'
                    onPress={() => {saveTask()}}
                    containerStyle={styles.saveButton}
                    buttonStyle={{paddingVertical:'14%'}}
                    color={APP_MAIN_BG_COLOR}
                >
                    Save
                </Button>
                <Button  
                    type='solid'
                    onPress={() => {markComplete()}}
                    containerStyle={styles.saveButton}
                    buttonStyle={{paddingVertical:'14%'}}
                    color='#ffd700'
                >
                    Mark Complete
                </Button>
                <Button  
                    type='solid'
                    onPress={() => {deleteTask()}}
                    containerStyle={styles.saveButton}
                    buttonStyle={{paddingVertical:'14%'}}
                    color='red'
                >
                    Delete
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    dateText: {
        marginLeft: '4%',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '2%'
    },
    inputFields: {
        marginTop: '5%'
    },
    saveButton: {
        width: '33.5%'
    }
  });
  