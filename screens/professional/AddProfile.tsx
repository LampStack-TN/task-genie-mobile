import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info from "../../components/professional/profile/addProfile/Info";
import Documents from "../../components/professional/profile/addProfile/Documents";
import { useForm } from "react-hook-form";
import Tabs from "../../components/professional/profile/addProfile/Tabs";

const Tab = createMaterialTopTabNavigator();

export default function AddProfile() {
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
        children={({ navigation }) => (
          <Info {...{ control, errors, navigation }} />
        )}
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
