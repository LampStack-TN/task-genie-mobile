import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import { Task } from './types';
import config from '../../../config';
const AppliedTasks = () => {
  const [appliedTasks, setAppliedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const userId = 100010; 
      const response = await axios.get(`${config.apiUrl}/api/task/app/${userId}`);
      setAppliedTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      {appliedTasks.map((task) => (
        <View key={task.id}>
          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AppliedTasks;
