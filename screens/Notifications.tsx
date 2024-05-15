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

const Notifications: FC<any> = ({ navigation }) => {
  const {
    notifications,
    _count: { notifications: count },
  } = useSelector((state: any) => state.user);

  console.log(count, notifications[0]);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        // onRefresh={handleRefresh}
        // refreshing={refreshing}
        contentContainerStyle={styles.container}
        data={notifications}
        renderItem={({ item, item: { isRead } }) => (
          <Pressable
            onPress={() => {
              alert("notilla");
            }}
          >
            <View
              style={[
                styles.notification,
                isRead && { backgroundColor: "#fff" },
              ]}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("ProfileDetails", {
                    userId: item.notifier.id,
                  })
                }
              >
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
                <Text style={styles.userTitle}>{item.message}</Text>
                {"\n"}
                <Text style={styles.userCity}>
                  {item.content.slice(0, 28)}...
                </Text>
              </Text>
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
    rowGap: 6,
    backgroundColor: "#fff",
    marginTop: 32,
  },
  notification: {
    backgroundColor: "#e6eaf1",
    // alignItems: "center",
    flexDirection: "row",
    gap: 12,
    flex: 1,
    padding: 5,
    paddingBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#93543aa0",
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  userInfo: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
  },
  profileName: {
    color: "#3c5a93",
  },
  userTitle: {
    color: "#4e4e4e",
    fontWeight: "400",
  },
  userCity: {
    color: "#4e4e4e",
  },
});
