import React from "react";
import { Stack } from "expo-router";

const routes = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="Step1" options={{ headerShown: false }} />
      <Stack.Screen name="Step2" options={{ headerShown: false }} />
      <Stack.Screen name="Step3" options={{ headerShown: false }} />
    </Stack>
  );
};

export default routes;
