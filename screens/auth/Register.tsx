import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../../components/auth/register";
import BasicInfos from "../../components/auth/BasicInfos";
import Contact from "../../components/auth/Contact";

const Stack = createNativeStackNavigator();

const RegisterIndex = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="register"
    >
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="basicInfos" component={BasicInfos} />
      <Stack.Screen name="contact" component={Contact} />
    </Stack.Navigator>
  );
};

export default RegisterIndex;
