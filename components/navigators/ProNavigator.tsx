import { Pressable, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProNavigator = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => {
          alert("You Are Logged Out!! Rload App");
          AsyncStorage.removeItem("token");
        }}
      >
        <Text
          style={{
            color: "#F58D61",
            fontSize: 40,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Professionls!..
        </Text>
        <Text
          style={{
            color: "#0C3178",
            fontSize: 40,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Coming Soon...
        </Text>
        <Text
          style={{
            color: "#4e4e4e",
            fontSize: 22,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Click Here And Reload App To Logout.
        </Text>
      </Pressable>
    </View>
  );
};

export default ProNavigator;
