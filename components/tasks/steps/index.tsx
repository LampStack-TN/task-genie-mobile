import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator initialRouteName="Step1">
      <Stack.Screen name="Step1" component={Step1} />
      <Stack.Screen name="Step2" component={Step2} />
      <Stack.Screen name="Step3" component={Step3} />
    </Stack.Navigator>
  );
};

export default Index;
