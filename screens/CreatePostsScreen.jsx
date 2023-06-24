import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [comment, setComment] = useState("");
  const [locationName, setLocationName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -165 : -165}
      >
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: -10, color: "white" }}>
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                }
              }}
            >
              <View style={styles.takePhotoOut}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Назва..."
          style={styles.input}
          value={comment}
          onChangeText={(value) => setComment(value)}
        ></TextInput>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Місцевість..."
          style={styles.input}
          value={locationName}
          onChangeText={(value) => setLocationName(value)}
        ></TextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate("PostsScreen")}
          style={styles.btnRegister}
        >
          <Text style={styles.textRegister}>Опубліковати</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    /* </TouchableWithoutFeedback> */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 34,
    paddingLeft: 16,
  },
  camera: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 90,
  },

  btnRegister: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    height: 51,
    marginBottom: 16,
  },

  textRegister: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },

  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    marginTop: 50,
  },
});

export default CreatePostsScreen;
