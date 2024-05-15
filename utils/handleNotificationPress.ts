import { navigationRef } from "../navigations/RootNavigation";

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

export const handleNotificationPressClient = (type, targetId) => {
  navigationRef.navigate(clientScreens[type], { id: targetId });
};

export const handleNotificationPressPro = (type, targetId) => {};
