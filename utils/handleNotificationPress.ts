import { navigationRef } from "../navigations/RootNavigation";
import { ApiClient } from "./api";

const clientScreens = {
  Application: "TaskDetails",
  Message: "Conversation",
};

const proScreens = {
  Application: "",
  Message: "",
  Acceptance: "",
  Completion: "",
  Hiring: "",
};

export const handleNotificationPressClient = async (id, type, targetId) => {
  // navigate to the respective screen
  navigationRef.navigate(clientScreens[type], { id: targetId });

  // send a request to mark the notification as read
  await ApiClient().get(`/notification/read/${id}`);
};

export const handleNotificationPressPro = (type, targetId) => {};
