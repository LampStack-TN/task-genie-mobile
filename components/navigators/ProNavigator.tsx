import { Text, View } from "react-native";
import ProfileIndex from "../professional/profile/ProfileIndex";
import NearbyJobsScreen from "../professional/tasks/applyingTasks/NearbyJobsScreen";
import Tabs from "../professional/profile/edit/Tabs";
import Home from "../professional/home/ProIndex";
import FavouriteTasksList from "../professional/tasks/favouriteTasks/FavouriteTasksList";
import proDetails from "../professional/tasks/proDetails";
import MyServices from "../professional/services/MyServices";
import ProIndex from "../professional/form/ProIndex";
import ServiceDetails from "../professional/serviceDetails/ServiceDetails";
import AppliedTasks from "../professional/tasks/applyingTasks/AppliedTasks";
const ProNavigator = ({ Stack }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Soon"
    >
      <Stack.Screen name="Soon" component={ProHome} />
      <Stack.Screen name="AddService" component={ProIndex} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="Tasks" component={NearbyJobsScreen} />
      <Stack.Screen name="ProfileIndex" component={ProfileIndex} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="FavouriteTasksList" component={FavouriteTasksList} />
      <Stack.Screen name="ProDetails" component={proDetails} />
      <Stack.Screen name="AppliedJobs" component={AppliedTasks} />
    </Stack.Navigator>
  );
};

export default ProNavigator;

const ProHome = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: "#F58D61",
            fontSize: 40,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Professionls!..
        </Text>
        <Text
          style={{
            color: "#0C3178",
            fontSize: 40,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Coming Soon...
        </Text>
        <Text
          style={{
            color: "#4e4e4e",
            fontSize: 22,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Click Here And Reload App To Logout.
        </Text>
      </View>
    </View>
  );
};
