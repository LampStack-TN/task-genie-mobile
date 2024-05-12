import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

//define Props Interface
interface Props {
  label: string | React.ReactNode;
  transparent?: boolean;
  color?: string;
  style?: "outline" | "fill" | "bare" | "light";
  size?: "normal" | "sm";
  callback?: () => any;
}

const Button = ({
  label,
  style,
  callback,
  color,
  transparent,
  size,
}: Props) => {
  const colors = {
    outline: color || "#0C3178",
    light: color || "#0C3178",
    fill: "#fff",
    bare: color || "#2e2e2e",
  };

  const styles = StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      // elevation: style == "bare" ? 0 : 1,
      overflow: "hidden",
      paddingHorizontal: size === "sm" ? 20 : 30,
      paddingVertical: size === "sm" ? 10 : 20,
    },
    outline: {
      borderWidth: 1,
      borderColor: color || "#0C3178",
      backgroundColor: transparent ? "#00000000" : "#fff",
      overflow: "hidden",
      color: color || "#0C3178",
    },
    fill: {
      backgroundColor: color || "#0C3178",
      overflow: "hidden",
      color: "#fff",
    },
    bare: {
      borderWidth: 0,
    },
    light: {
      borderWidth: 2,
      color: color || "#2e2e2e",
      borderColor: color + "a0" || "#0C3178a0",
      backgroundColor: color + "08" || "#0C317808",
    },
    text: {
      color: colors[style],
      fontSize: size === "sm" ? 14 : 20,
      lineHeight: 21,
      fontWeight: "500",
      letterSpacing: 0.25,
    },
  });

  return (
    <Pressable onPress={callback}>
      <View style={[styles.button, styles[style]]}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
