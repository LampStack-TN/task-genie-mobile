import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../ui/Button";

const colors = {
  Pending: "#0C3178",
  Accepted: "#0c6778",
  Rejected: "#780c0c",
  Complete: "#31780c",
};

const TaskActions = ({ task, onApply, onCancel, onToggleLike }) => {
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "flex-end" }}>
      <Button
        label={task.applied ? task.applications[0].status + "..." : "Aplly"}
        style={task.applied ? "light" : "fill"}
        size="sm"
        color={task.applied && colors[task.applications[0].status]}
        callback={
          task.applied
            ? () => onCancel(task.applications[0].id)
            : () => onApply(task)
        }
      />
      <TouchableOpacity onPress={() => onToggleLike()}>
        <MaterialIcons
          name={task.liked ? "favorite" : "favorite-outline"}
          size={40}
          color="#F58D61"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskActions;
