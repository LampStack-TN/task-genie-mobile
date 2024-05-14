import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FC } from "react";
import { useSelector } from "react-redux";

const Notifications: FC = () => {
  const {
    notifications,
    _count: { notifications: count },
  } = useSelector((state: any) => state.user);

  console.log(count, notifications);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        // onRefresh={handleRefresh}
        // refreshing={refreshing}
        contentContainerStyle={styles.container}
        data={notifications}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              alert("notilla");
            }}
          >
            <View style={styles.notification}>
              <View style={styles.profile}>
                <Pressable onPress={() => alert("pro")}>
                  <Image
                    source={{
                      uri: item.notifier.avatar,
                    }}
                    style={styles.profilePhoto}
                  />
                </Pressable>
                <Text style={styles.userInfo}>
                  <Text style={styles.profileName} onPress={() => alert("pro")}>
                    {item.notifier.fullName}
                  </Text>{" "}
                  <Text style={styles.userTitle}>{item.message}</Text>{" "}
                  <Text style={styles.userCity}>
                    application applicant city
                  </Text>
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    overflow: "hidden",
    rowGap: 11,
    backgroundColor: "#fff",
  },
  notification: {
    backgroundColor: "#c5c5c5",
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    flex: 1,
    padding: 5,
    paddingBottom: 12,
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  userInfo: {
    flex: 1,
    fontSize: 20,
  },
  profileName: {
    color: "#4e4e4e",
  },
  userTitle: {
    color: "#4e4e4e",
  },
  userCity: {
    flex: 1,
    fontWeight: "500",
    color: "#F58D61",
  },
});
