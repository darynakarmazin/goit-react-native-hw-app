import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const RegistrationScreen = () => {
  const [isInputActive, setIsInputActive] = useState("");

  const onInputActive = (input) => {
    setIsInputActive(input);
  };
  const onInputBlur = () => {
    setIsInputActive("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/photo-bg.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.form}>
        <View style={styles.avatar}>
          <Image />
          <TouchableOpacity style={styles.btnAddAvatar}>
            <Image
              source={require("../assets/union.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.inputsList}>
          <TextInput
            onFocus={() => onInputActive("login")}
            onBlur={onInputBlur}
            style={[
              styles.input,
              isInputActive === "login" && styles.inputActive,
            ]}
            placeholder="Логін"
          ></TextInput>
          <TextInput
            onFocus={() => onInputActive("email")}
            onBlur={onInputBlur}
            style={[
              styles.input,
              isInputActive === "email" && styles.inputActive,
            ]}
            placeholder="Адреса електронної пошти"
          ></TextInput>
          <TextInput
            onFocus={() => onInputActive("password")}
            onBlur={onInputBlur}
            style={[
              styles.input,
              isInputActive === "password" && styles.inputActive,
            ]}
            placeholder="Пароль"
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.textRegister}>Зареєструватися</Text>
        </TouchableOpacity>
        <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 45,
  },

  avatar: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },

  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },

  btnAvatarText: {
    color: "#FF6C00",
    fontSize: 18,
    lineHeight: 18,
  },

  title: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderStyle: "solid",
    backgroundColor: "#F6F6F6",
    padding: 15,
    maxHeight: 50,
    marginBottom: 16,

    fontSize: 16,
    lineHeight: 19,
  },

  inputActive: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
    padding: 15,
    maxHeight: 50,
    marginBottom: 16,
    color: "#212121",

    fontSize: 16,
    lineHeight: 19,
  },

  inputsList: {
    marginBottom: 43,
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
    lineHeight: 19,
  },

  textLogin: {
    color: "#1B4371",
    textAlign: "center",
  },
});
