import { Text, View } from "react-native";
import ProfileIndex from "../components/professional/profile/ProfileIndex";
import TaskList from "../screens/professional/TaskList";
import Tabs from "../screens/professional/EditProfile";
import Home from "../components/client/Menu";
import FavouriteTasksList from "../screens/professional/FavouriteTasksList";
import proDetails from "../screens/professional/TaskDetails";
import MyServices from "../screens/professional/MyServices";
import ProIndex from "../screens/professional/AddService";
import ServiceDetails from "../screens/professional/ServiceDetails";
import AppliedTasks from "../screens/professional/AppliedTasks";
import ConversationList from "../screens/chat/ConversationList";
import Conversation from "../screens/chat/Conversation";
import Profile from "../screens/professional/Profile";
const ProNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ced5e4",
          borderBottomColor: "#e6eaf1",
          padding: 20,
          borderBottomWidth: 1,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View>
            <Text>Back</Text>
          </View>
        ),
        animationEnabled: false,
      }}
      initialRouteName="task-list"
    >
      <Stack.Screen
        name="AddService"
        component={ProIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyServices"
        component={MyServices}
        options={{ title: "My Services" }}
      />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen
        name="task-list"
        component={TaskList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileIndex"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="FavouriteTasksList"
        component={FavouriteTasksList}
        options={{ title: "Favorite Tasks" }}
      />
      <Stack.Screen
        name="ProDetails"
        component={proDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppliedJobs"
        component={AppliedTasks}
        options={{ title: "Applications" }}
      />
      <Stack.Screen
        name="ConversationList"
        component={ConversationList}
        options={{ title: "Messages" }}
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProNavigator;
