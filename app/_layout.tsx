import React from "react";
import { Stack } from "expo-router";

const routes = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="components/tasks/steps/taskDetails/details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/auth/register"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/tasks/steps/Step1"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/tasks/steps/Step2"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="components/tasks/steps/Step3"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default routes;
