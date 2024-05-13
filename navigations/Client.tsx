import TaskDetails from "../screens/client/TaskDetails";
import MyTabs from "../screens/client/EditTask";
import UserTaskList from "../screens/client/TaskList";
import TaskStepsIndex from "../screens/client/AddTask";
import ProfileDetails from "../screens/client/ProfileDetails";
import MyHiredServices from "../screens/client/MyHiredServices";
import ServicesList from "../screens/client/ServicesList";
import React from "react";
import ConversationList from "../screens/chat/ConversationList";
import Conversation from "../screens/chat/Conversation";
const UserNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyTasks"
    >
      <Stack.Screen name="AddTask" component={TaskStepsIndex} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="MyTasks" component={UserTaskList} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="ServicesList" component={ServicesList} />
      <Stack.Screen name="ConversationList" component={ConversationList} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="MyHiredServices" component={MyHiredServices}/> 
    </Stack.Navigator>
  );
};

export default UserNavigator;
