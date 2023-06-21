import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

const LoginScreen = () => {
  const [isInputActive, setIsInputActive] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    console.log("email:", email);
    console.log("password:", password);
  };

  const onInputActive = (input) => {
    setIsInputActive(input);
  };
  const onInputBlur = () => {
    setIsInputActive("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/photo-bg.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -165 : -165}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputsList}>
              <TextInput
                onChangeText={setEmail}
                value={email}
                onFocus={() => onInputActive("email")}
                onBlur={onInputBlur}
                style={[
                  styles.input,
                  isInputActive === "email" && styles.inputActive,
                ]}
                placeholder="Адреса електронної пошти"
              />
              <TextInput
                onChangeText={setPassword}
                value={password}
                onFocus={() => onInputActive("password")}
                onBlur={onInputBlur}
                style={[
                  styles.input,
                  isInputActive === "password" && styles.inputActive,
                ]}
                placeholder="Пароль"
              />
            </View>
            <TouchableOpacity onPress={onLogin} style={styles.btnRegister}>
              <Text style={styles.textRegister}>Увійти</Text>
            </TouchableOpacity>
            <Text style={styles.textLogin}>
              Немає акаунту?{" "}
              <Text style={styles.textLoginLink}>Зареєструватися</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
    paddingTop: 32,
  },

  title: {
    fontWeight: 500,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },

  textLogin: {
    color: "#1B4371",
    textAlign: "center",
    marginBottom: 45,
  },

  textLoginLink: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
