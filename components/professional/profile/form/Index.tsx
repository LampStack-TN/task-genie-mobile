import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info from "./Info";
import Skills from "./Skills";
import Documents from "./Documents";
import { useForm } from "react-hook-form";
import Tabs from "./Tabs";

const Tab = createMaterialTopTabNavigator();

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      bio: "",
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="PersonalDetails"
      tabBar={(props) => <Tabs {...props} />}
    >
      <Tab.Screen
        name="PersonalDetails"
        children={() => <Info {...{ control, errors }} />}
        options={{ tabBarLabel: "Personal Details" }}
        />
      {/* <Tab.Screen
        name="ProfessionalInfo"
        component={Skills}
        initialParams={{}}
        options={{ tabBarLabel: "Skills" }}
    /> */}
      <Tab.Screen
        name="Documents"
        children={() => <Documents {...{ control, errors }} />}
        options={{ tabBarLabel: "Documents" }}
      />
    </Tab.Navigator>
  );
}
