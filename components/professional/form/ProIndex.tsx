import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Information from "./Information"; 
import Price from "./Price";
import Skills from "./Skills";

const Stack = createNativeStackNavigator();

const ProIndex = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Step1"
    >
      <Stack.Screen name="Step1" component={Information} />
      <Stack.Screen name="Step2" component={Skills} />
      <Stack.Screen name="Step3" component={Price} />
    </Stack.Navigator>
  );
};

export default ProIndex;