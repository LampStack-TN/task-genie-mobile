import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Register";
import BasicInfos from "./BasicInfos";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator initialRouteName="register">
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="basicInfos" component={BasicInfos} />
    </Stack.Navigator>
  );
};

export default Index;
