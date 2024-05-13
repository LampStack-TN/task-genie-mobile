// In App.js in a new project
import {
  View,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";

import RegisterIndex from "./screens/auth/register/Index";
import Login from "./screens/auth/Login";
import BottomNavUser from "./components/ui/BottomNavUser";
import UserNavigator from "./navigations/Client";
import Splash from "./components/ui/Splash";
import checkAuthentication from "./utils/checkAuthentication";
import RoleForm from "./screens/auth/register/RoleForm";
import ProNavigator from "./navigations/Pro";
import BottomNavPro from "./components/ui/BottomNavPro";
import ProfileForm from "./components/professional/profile/form/Index";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const Main = () => {
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      checkAuthentication(setLoading, dispatch);
    }
  }, [user]);

  return loading ? (
    <Splash />
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <NavigationContainer>
        {user ? (
          <SafeAreaView
            style={{
              flex: 1,
              marginTop: StatusBar.currentHeight,
              backgroundColor: "#fff",
            }}
          >
            {user.role ? (
              user.role == "client" ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                  <UserNavigator Stack={Stack} />
                  <BottomNavUser />
                </View>
              ) : user.profile ? (
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                  <ProNavigator Stack={Stack} />
                  <BottomNavPro />
                </View>
              ) : (
                <ProfileForm />
              )
            ) : (
              <RoleForm />
            )}
          </SafeAreaView>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Register" component={RegisterIndex} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

export default App;
