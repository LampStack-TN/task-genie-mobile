import { StyleSheet, Text, View ,TouchableOpacity ,TextInput} from 'react-native'
import React from 'react'

const step3 = ({navigation}) => {
    return (
        <View style={styles.container}>
          <View style={styles.stepContainer}>
            <Text style={styles.heading}>Edit :</Text>
            <Text
              style={{ marginBottom: 10, alignSelf: "flex-start", paddingTop: 10 }}
            >
              Time & Date
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Time & Date"
              onChangeText={(text) => {
                
              }}
              
              style={styles.input}
            />
    
            <TextInput
              placeholder="minPrice"
              onChangeText={(text) => {
               
              }}
             
              style={styles.input}
            />
            <TextInput
              placeholder="maxPrice"
              onChangeText={(text) => {
                
              }}
             
              style={styles.input}
            />
          </View>
          <View style={styles.button2}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("step1");
              }}
            >
              <Text style={[styles.text, { color: "white" }]}>Finish</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("step2")}>
              <Text style={styles.textt}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      },
      stepContainer: {
        alignSelf: "flex-start",
        marginBottom: 20,
        paddingTop: 10,
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
      text: {
        paddingVertical: 4 * 2,
        paddingHorizontal: 20,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "#0C3178",
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
      button2: {
        position: "absolute",
        bottom: 40,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 50,
        elevation: 3,
        backgroundColor: "#0C3178",
        overflow: "hidden",
      },
    });

export default step3

