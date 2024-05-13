import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobDescription from "../../components/client/addTask/JobDescription";
import SkillForm from "../../components/client/addTask/SkillForm";
import DateTime from "../../components/client/addTask/DateTime";

const Stack = createNativeStackNavigator();

const AddTask = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Step1"
    >
      <Stack.Screen name="Step1" component={JobDescription} />
      <Stack.Screen name="Step2" component={SkillForm} />
      <Stack.Screen name="Step3" component={DateTime} />
    </Stack.Navigator>
  );
};

export default AddTask;
