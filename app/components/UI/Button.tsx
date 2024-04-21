import { View, Text, Pressable, StyleSheet } from "react-native";

//define Props Interface
interface Props {
  label: string;
  style?: "outline" | "fill";
  callback?: Function;
}

const Button = ({ label, style }: Props) => {
  const styles = StyleSheet.create({
    button: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      elevation: 2,
      overflow: "hidden",
      height: 60,
    },
    outline: {
      borderColor: "#0C3178",
      borderWidth: 1,
      backgroundColor: "#fff",
      overflow: "hidden",
      color: "#0C3178",
    },
    fill: {
      backgroundColor: "#0C3178",
      overflow: "hidden",
      color: "#fff",
    },
    text: {
      color: style === "fill" ? "#fff" : "#0C3178",
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "500",
      letterSpacing: 0.25,
    },
  });

  return (
    <View style={[styles.button, styles[style]]}>
      <Pressable onPress={() => console.log("pressed", label)}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
