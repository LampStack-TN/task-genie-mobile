import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { ApiClient } from "../../../utils/api";

import Button from "../../ui/Button";

const Info = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      bio: "",
    },
  });

  const { setDummy } = route.params;

  const CreateProfile = async (data: any) => {
    try {
      await ApiClient().post("profile/createProfile/", data);
      setDummy((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: any) => {
    CreateProfile(data);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subTitle}>Professional Info</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.inputView}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "jobTitle required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Title"
                    value={value}
                    style={styles.input}
                  />
                )}
                name="jobTitle"
              />
            </View>
            {errors.jobTitle && (
              <Text style={{ color: "#f01010" }}>
                {errors.jobTitle.message}
              </Text>
            )}

            <View style={styles.inputBio}>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "Bio is required" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Bio"
                    value={value}
                    style={styles.input}
                  />
                )}
                name="bio"
              />
            </View>
            {errors.bio && (
              <Text style={{ color: "#f01010" }}>{errors.bio.message}</Text>
            )}
          </View>
          <View style={styles.footer}>
            <Button
              label="Next"
              style="fill"
              callback={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    paddingLeft: 10,
  },
  text: {
    color: "#0C3178",
    paddingVertical: 4 * 2,
    paddingHorizontal: 20,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    paddingTop: 25,
  },
  section: {
    gap: 15,
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  back: {
    position: "absolute",
    top: 32,
    left: 16,
    fontSize: 18,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0C3178",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6e6e6e",
  },
  inputView: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    justifyContent: "center",
    elevation: 3,
  },
  inputBio: {
    backgroundColor: "#fff",
    height: 150,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    justifyContent: "center",
    elevation: 3,
  },
  input: {
    fontSize: 14,
  },
});
