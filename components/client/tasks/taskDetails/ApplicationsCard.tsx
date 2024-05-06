import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ApplicationsCard = ({ task, toggleModal }) => {
  return (
    <Pressable onPress={toggleModal}>
      {({ pressed }) => (
        <View
          style={[
            styles.applicantCountButton,
            pressed && { backgroundColor: "#1D4FAFE0" },
          ]}
        >
          <Text style={styles.applicantCountText}>
            {task._count && task._count.applications > 0
              ? `${task._count.applications} People Apllications Pending...`
              : "No one Applied Yet"}
          </Text>
          <Text style={styles.seeDetailsText}>See details →</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ApplicationsCard;

const styles = StyleSheet.create({
  applicantCountButton: {
    backgroundColor: "#1D4FAF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#052157",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 20,
    position: "relative",
  },

  applicantCountText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  seeDetailsText: {
    color: "#F49871",
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
    marginTop: 5,
  },
});
