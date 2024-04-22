import { View, Text, Pressable, StyleSheet } from "react-native";

//define Props Interface
interface Props {
  label: string;
  style?: "outline" | "fill" | "bare";
  callback?: () => any;
}

const colors = {
  outline: '#0C3178',
  fill: '#fff',
  bare: '#2e2e2e',
};
const Button = ({ label, style, callback }: Props) => {
  const styles = StyleSheet.create({
    button: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      elevation: 2,
      overflow: "hidden",
      height: 60,
      minWidth: 100,
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
    bare: {
      borderWidth: 0,
      color: "#2e2e2e",
    },
    text: {
      color: colors[style],
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "500",
      letterSpacing: 0.25,
    },
  });

  return (
    <View style={[styles.button, styles[style]]}>
      <Pressable onPress={callback}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
