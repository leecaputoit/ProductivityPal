import { StyleSheet, Text, ToastAndroid, View, Alert } from 'react-native';
import { Input } from '@rneui/themed'
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useRef, useEffect} from 'react';
import { Button } from '@rneui/themed'
import { save, retrieve, toTimeString } from '../utils/utility';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTaskScreen({ route, navigation }) {
    const [taskDesc, setTaskDesc] = useState('');
    const [location, setLocation] = useState('');
    const [timePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState(false);
    const [timeResultVisible, setTimeResultVisibility] = useState(false);
    const [timeResult, setTimeResult] = useState('');
    const [openDDP, setOpenDDP] = useState(false);
    const [repeatSetting, setRepeatSetting] = useState('');
    const [ddpItems, setDDPItems] = useState([
        {label: 'Don\'t repeat (notfies an hour before deadline)', value: '0'},
        {label: 'Every hour', value: '1'},
        {label: 'Every day', value: '2'},
        {label: 'Every week', value: '3'}
    ]);
    const [notes, setNotes] = useState('');

    let saveTask = async () => {
        if(taskDesc.length === 0){
            Alert.alert('Missing required field(s)', 'Task description is required');
        }else if(!time){
            Alert.alert('Missing required field(s)', 'Task deadline is required');
        }else if(repeatSetting.length === 0){
            Alert.alert('Missing required field(s)', 'Repeat setting is required');
        }else{
            // create new task object
            let task = {
                id: Math.random() * 1000,
                taskDesc: taskDesc,
                location: location,
                time: time.toJSON(),
                repeatSetting: repeatSetting,
                notes: notes,
                date: route.params.date
            }
    
            // get the task list associated with the current date 
            // route.date here is passed in from the previous screeen and is a stringified date
            let curTaskList = await retrieve(route.params.date);
            // if it exists, we add the task to it
            if(curTaskList != null){
                // de-serialize the task list
                curTaskList = JSON.parse(curTaskList);
                // add task object to task list
                curTaskList.push(task);
                // save the updated task list to storage
                await save(route.params.date, JSON.stringify(curTaskList));
            }else{
                // if it doesn't exist, we create a new list and save it with the new task
                let taskList = [task];
                await save(route.params.date, JSON.stringify(taskList))
            }
    
            navigation.navigate("Home", {workaround: true});
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{route.params.date}</Text>
            <Input 
                placeholder='Task Description'
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="event-note" size={20} color='#2fd281' style={{paddingTop: '5%'}}/>}
                onChangeText={value => setTaskDesc(value)}
            />
            <Input 
                placeholder='Location'
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="location-on" size={20} color='#2fd281' style={{paddingTop: '5%'}}/>}
                onChangeText={value => setLocation(value)}
            />

            <Input 
                placeholder='Notes'
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="note-alt" size={20} color='#2fd281' style={{paddingTop: '5%'}}/>}
                onChangeText={value => setNotes(value)}
            />
           
            <Button
                type='outline'
                titleStyle={{color:'#2fd281', fontSize: 20}}
                icon={<Icon name="schedule" size={25} color='#2fd281' />}
                containerStyle={{marginTop: '5%', width: '90%', alignSelf: 'center', borderWidth: 1.5, borderColor: '#2fd281', borderRadius: 15}}
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
                            setTime(date);
                        }else{
                            setTimePickerVisibility(false)
                        }
                    }}
                />
            }   

            {
                timeResultVisible &&
                <Text style={{fontSize: 25, alignSelf: 'center', marginTop: '3%', color: '#2fd281'}}>Deadline Set: <Text style={{fontWeight: 'bold'}}>{timeResult}</Text></Text>
            }

            <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: '7%'}}> 
                <Icon name="repeat" size={25} color='#2fd281' style={{paddingTop: '3%', paddingRight: '1%'}}/>
                <DropDownPicker
                    open={openDDP}
                    value={repeatSetting}
                    items={ddpItems}
                    setOpen={setOpenDDP}
                    setValue={setRepeatSetting}
                    setItems={setDDPItems}
                    containerStyle={{width: '90%'}}
                    style={{backgroudnColor: '#2fd281'}}
                    placeholder='Select a repeat setting (repeatedly notify the user until deadline)'
                    zIndex={0}
                />
            </View>

            <Button 
                radius={'sm'} 
                type='solid'
                onPress={() => {saveTask()}}
                containerStyle={styles.saveButton}
                buttonStyle={{paddingVertical:'5%'}}
                color='#2fd281'
            >
                Save
            </Button>
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
        width: '100%',
        marginTop: 'auto',
    }
  });
  