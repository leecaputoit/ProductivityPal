import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Input } from '@rneui/themed'
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useRef, useEffect} from 'react';
import { Button } from '@rneui/themed'
import { save, retrieve } from '../utils/utility';

export default function AddTaskScreen({ route, navigation }) {
    const [taskDesc, setTaskDesc] = useState('');

    let saveTask = async () => {
        // create new task object
        let task = {
            id: Math.random() * 1000,
            taskDesc: taskDesc
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

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{route.params.date}</Text>
            <Input 
                placeholder='Task Description'
                inputStyle={styles.inputFields}
                leftIcon={<Icon name="event-note" size={20} color='blue' style={{paddingTop: '5%'}}/>}
                onChangeText={value => setTaskDesc(value)}
            />
            <Button 
                radius={'sm'} 
                type='solid'
                onPress={() => {saveTask()}}
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
      justifyContent: 'flex-start',
    },
    dateText: {
        marginLeft: '4%',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '2%'
    },
    inputFields: {
        marginTop: '5%'
    }
  });
  