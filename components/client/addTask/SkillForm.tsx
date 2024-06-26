import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/slices/TaskSlice";
import skills from "../../../data/skills.json";
import Button from "../../ui/Button";

export default function SkillsForm({ navigation }) {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      skills: [],
    },
  });

  const onSubmit = (data) => {
    dispatch(addTask(data));
    navigation.navigate("Step3");
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.heading}>Step 2</Text>
        <Text
          style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
        >
          Skills & Expertise
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <MultiSelect
              style={styles.input}
              placeholderStyle={styles.placeholderStyle}
              data={skills}
              labelField="name"
              valueField="id"
              placeholder="Skills"
              searchPlaceholder="Search..."
              search={true}
              value={value}
              onChange={onChange}
              selectedStyle={styles.skillPill}
              selectedTextStyle={styles.skillText}
              containerStyle={{
                paddingHorizontal: 14,
                borderRadius: 30,
              }}
            />
          )}
          name="skills"
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Back"
          style="bare"
          callback={() => navigation.goBack()}
        />
        <Button
          label="Next"
          style="outline"
          callback={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  stepContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingTop: 1,
  },
  heading: {
    paddingTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    color: "#0C3178",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    flex: 3,
    gap: 15,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 300,
  },
  input: {
    backgroundColor: "#fff",
    height: 60,
    width: 350,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 20,
    fontSize: 14,
    elevation: 3,
  },
  placeholderStyle: {
    fontSize: 16,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
  skillPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#6e6e6e",
    backgroundColor: "#f8f8f8",
    verticalAlign: "middle",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
  },
  skillText: {
    verticalAlign: "middle",
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 14,
  },
});
