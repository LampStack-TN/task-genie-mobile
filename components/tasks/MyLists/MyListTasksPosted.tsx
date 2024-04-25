import React from "react";
import { ScrollView ,View,Text} from "react-native";



const MyListTasksPosted = ({ task }) => {
    return (
        <View >
          <Text >{task.title}</Text>
          <Text>{task.description}</Text>
        </View>
      );
    };
  export default MyListTasksPosted;
  