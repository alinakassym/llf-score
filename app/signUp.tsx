// app/signUp.tsx
import GradientButton from "@/components/GradientButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { app } from "@/firebaseConfig.js";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Redirect, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function signUpScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const router = useRouter();
  const { signIn, session } = useSession();

  if (session) return <Redirect href="/(tabs)" />;

  const validateForm = (): boolean => {
    const newErrors = {
      email: "",
      password: "",
      repeatedPassword: "",
    };

    // Валидация email
    if (!email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Введите корректный email";
    }

    // Валидация пароля
    if (!password.trim()) {
      newErrors.password = "Пароль обязателен";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    // Валидация повторного пароля
    if (!repeatedPassword.trim()) {
      newErrors.repeatedPassword = "Повторите пароль";
    } else if (password !== repeatedPassword) {
      newErrors.repeatedPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return (
      !newErrors.email && !newErrors.password && !newErrors.repeatedPassword
    );
  };

  const handleSignUp = async (email: string, password: string) => {
    if (!validateForm()) {
      return;
    }

    try {
      console.log("SignUp attempt:", email);
      const auth = getAuth(app);
      const res = createUserWithEmailAndPassword(auth, email, password)
        .then((res) => console.log("SignUp Page res: ", res))
        .catch((err) => console.log("SignUp Page err: ", err));
      // await signIn(email, password);
      // router.replace("/(tabs)");
      console.log("SignUp res:", res);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <View style={{ backgroundColor: c.background }}>
      <LoginHeader
        title="Регистрация"
        text="Для регистрации введите свой адрес электронной почты и пароль"
      />
      <ScrollView style={{ padding: 16, height: "100%" }}>
        <TextField
          label="Электронная почта"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          placeholder="Введите email"
          error={errors.email}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Придумайте пароль"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          placeholder="Введите пароль"
          secureTextEntry
          error={errors.password}
          style={{ marginBottom: 16 }}
        />

        <TextField
          label="Повторите пароль"
          value={repeatedPassword}
          onChangeText={(text) => {
            setRepeatedPassword(text);
            if (errors.repeatedPassword)
              setErrors({ ...errors, repeatedPassword: "" });
          }}
          placeholder="Введите пароль повторно"
          secureTextEntry
          error={errors.repeatedPassword}
          style={{ marginBottom: 24 }}
        />

        <GradientButton
          title="Зарегистрироваться"
          onPress={() => handleSignUp(email, password)}
          style={{ marginBottom: 32 }}
        />
        {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: c.text }}>или</Text>
        </View>
        <View
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <FacebookButton />
          </View>
          <View style={{ width: "48%" }}>
            <GoogleButton />
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}
