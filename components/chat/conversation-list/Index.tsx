import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ApiClient } from "../../../utils/api";

const Index = () => {
  const [conversations, setConversations] = useState();

  const getConversations = async () => {
    const { data } = await ApiClient().get("/api/chat/conversations");
    console.log(data);
  };

  useEffect(() => {}, []);
  return (
    <View>
      <Text>Index</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
