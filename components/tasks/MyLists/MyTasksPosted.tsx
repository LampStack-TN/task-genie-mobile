import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Tasks } from "./TaskTypes";
import MyListTasksPosted from "./MyListTasksPosted"
 import { ApiClient } from "../../../api";


const MyTasksPosted = () => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
console.log(tasks);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await ApiClient().get(
            "/task/myTasks"
          );
          setTasks(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchTasks();
    }, []);
  
  
    return (
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <MyListTasksPosted
            key={task.id}
            task={task}
         
          
          />
        ))}
      </ScrollView>
    );
  };
  
  export default MyTasksPosted;
  