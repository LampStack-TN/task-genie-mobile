import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobDescription from "./JobDescription";
import SkillForm from "./SkillForm";
import DateTime from "./DateTime";

const Stack = createNativeStackNavigator();

const Index = () => {
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

export default Index;
