import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

const step1 = ({navigation}) => {
    return (
        <View style={styles.container}>
          <View style={styles.stepContainer}>
            <Text style={styles.heading}>Edit :</Text>
            <Text
              style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
            >
              Basic Job Description
            </Text>
          </View>
    
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Title"
              onChangeText={() => {
                
              }}
              
              style={styles.input}
            />
    
            <TextInput
              placeholder="Description"
              onChangeText={(text) => {
                
              }}
              
              style={[styles.input, styles.largeInput]}
              multiline={true}
              numberOfLines={4}
            />
    
            <TextInput
              placeholder="Location"
              onChangeText={(text) => (text)}
              
              style={styles.input}
            />
          </View>
    
          <View style={styles.button1}>
            <TouchableOpacity onPress={ ()=>navigation.navigate("step2")}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          </View>
    
          <View
            style={{
              position: "absolute",
              bottom: 40,
              left: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.textt}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    export default step1
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
        backgroundColor: "#fff",
      },
      stepContainer: {
        alignSelf: "flex-start",
        marginBottom: 20,
        paddingTop: 1,
      },
      heading: {
        paddingTop: 60,
        fontSize: 30,
        fontWeight: "bold",
        color: "#0C3178",
      },
      inputContainer: {
        width: "100%",
        alignItems: "center",
        flex: 3,
        gap: 15,
        justifyContent: "center",
        paddingHorizontal: 11,
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
      largeInput: {
        height: 120,
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
      textt: {
        paddingVertical: 4 * 2,
        paddingHorizontal: 20,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#0C3178",
      },
      button1: {
        position: "absolute",
        bottom: 40,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        borderColor: "#0C3178",
        borderWidth: 2,
        elevation: 3,
        backgroundColor: "#fff",
        overflow: "hidden",
      },
    });
    