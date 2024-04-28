import { ImageBackground, Text, View } from "react-native";
import React from "react";
import splash from "../../assets/splash.png";

const Splash = () => {
  return (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%", // Set the height to cover the entire container
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 50,
            backgroundColor: "#00000090",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Temporary Loading Message
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;
