import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyListTasksPosted = ({ task }) => {
    return (
        <View style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.info}>
            <Icon name="place" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{task.location}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="event" size={20} color="#FF9800" />
            <Text style={styles.infoText}>{task.dueDate}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="attach-money" size={20} color="#F44336" />
            <Text style={styles.infoText}>{`${task.minPrice} - ${task.maxPrice}`}</Text>
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        marginLeft: 5,
    }
});

export default MyListTasksPosted;
