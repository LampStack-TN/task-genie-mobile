import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info from "./Info";
import Documents from "./Documents";
import { useForm } from "react-hook-form";
import Tabs from "./Tabs";

const Tab = createMaterialTopTabNavigator();

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      bio: "",
      cinRecto: null,
      cinVerso: null,
      officialDoc: null,
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
        children={() => (
          <Documents {...{ control, errors, handleSubmit, setValue }} />
        )}
        options={{ tabBarLabel: "Documents" }}
      />
    </Tab.Navigator>
  );
}
