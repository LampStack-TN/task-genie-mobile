import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info from "./Info";
import Skills from "./Skills";
import Documents from "./Documents";

const Tab = createMaterialTopTabNavigator();

export default function ProfileForm({ route }) {
  const { user } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="PersonalDetails"
      tabBar={(props) => <MyTab {...props} />}
    >
      <Tab.Screen
        name="PersonalDetails"
        component={Info}
        initialParams={{ user }}
        options={{ tabBarLabel: "Personal Details" }}
      />
      <Tab.Screen
        name="ProfessionalInfo"
        component={Skills}
        initialParams={{ profile: user.profile }}
        options={{ tabBarLabel: "Professional Info" }}
      />
      <Tab.Screen
        name="Security"
        component={Documents}
        options={{ tabBarLabel: "Security" }}
      />
    </Tab.Navigator>
  );
}
