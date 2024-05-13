import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import JobDescription from "../../components/client/editTask/JobDescription";
import Expertise from "../../components/client/editTask/Expertise";
import DateTime from "../../components/client/editTask/DateTime";
import MyTab from "../../components/ui/TopTabs";


const Tab = createMaterialTopTabNavigator();

type EditTaskProps = {
  route: any;
};

const EditTask: React.FC<EditTaskProps> = ({ route }) => {
  const taskId = route.params.taskId;

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTab {...props} />}
      initialRouteName="JobDescription"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="JobDescription"
        component={JobDescription}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Description" }}
      />
      <Tab.Screen
        name="Expertise"
        component={Expertise}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Skills" }}
      />
      <Tab.Screen
        name="DateTime"
        component={DateTime}
        initialParams={{ taskId }}
        options={{ tabBarLabel: "Time & Price" }}
      />
    </Tab.Navigator>
  );
};

export default EditTask;
