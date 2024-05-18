import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import React from "react";
import splash from "../../assets/splash.png";

const Splash = () => {
  return (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%", // Set the height to cover the entire container
      }}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.5,
          }}
        >
          <ActivityIndicator
            size={"large"}
            color={"#f58d61"}
          ></ActivityIndicator>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Splash;
