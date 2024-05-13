import { Text, View } from "react-native";
import ProfileIndex from "../components/professional/profile/ProfileIndex";
import TaskList from "../components/professional/tasks/tasksList/TaskList";
import Tabs from "../components/professional/profile/edit/Tabs";
import Home from "../components/professional/home/ProIndex";
import FavouriteTasksList from "../components/professional/tasks/favouriteTasks/FavouriteTasksList";
import proDetails from "../components/professional/tasks/proDetails";
import MyServices from "../components/professional/services/MyServices";
import ProIndex from "../components/professional/form/ProIndex";
import ServiceDetails from "../components/professional/serviceDetails/ServiceDetails";
import AppliedTasks from "../components/professional/tasks/applyingTasks/AppliedTasks";
import ConversationList from "../screens/chat/ConversationList";
import Conversation from "../screens/chat/Conversation";
import Profile from "../components/professional/profile/Profile";
const ProNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="task-list"
    >
      <Stack.Screen name="AddService" component={ProIndex} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="task-list" component={TaskList} />
      <Stack.Screen name="ProfileIndex" component={Profile} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="FavouriteTasksList" component={FavouriteTasksList} />
      <Stack.Screen name="ProDetails" component={proDetails} />
      <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
      <Stack.Screen name="ConversationList" component={ConversationList} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export default ProNavigator;

