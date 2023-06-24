import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
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
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState("");

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

  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -165 : -165}
      >
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.photoView}>
            <Image source={{ uri: photo }} style={styles.previewPhoto} />
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
        {photo ? (
          <Text style={styles.text}>Редагувати фото</Text>
        ) : (
          <Text style={styles.text}>Завантажте фото</Text>
        )}
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Назва..."
          style={styles.input}
          value={comment}
          onChangeText={(value) => setComment(value)}
        ></TextInput>
        <View style={styles.wrapper}>
          <TextInput
            placeholderTextColor={"#BDBDBD"}
            placeholder="Місцевість..."
            style={styles.inputLocation}
            value={locationName}
            onChangeText={(value) => setLocationName(value)}
          ></TextInput>
          <TouchableOpacity
            style={styles.locationBtn}
            onPress={() =>
              navigation.navigate("MapScreen", {
                location: location.coords,
              })
            }
          >
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
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
    marginTop: 80,
  },

  text: {
    marginTop: 8,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  locationBtn: {
    position: "absolute",
    top: 10,
    width: 25,
    height: 25,
  },

  wrapper: {
    position: "relative",
  },

  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputLocation: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 26,
    marginBottom: 32,
  },
});

export default CreatePostsScreen;
