// app/login.tsx
import GradientButton from "@/components/GradientButton";
import LinkButton from "@/components/LinkButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { app } from "@/firebaseConfig.js";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Redirect, useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { signIn, session } = useSession();

  if (session) return <Redirect href="/(tabs)" />;

  const handleLogin = async (email: string, password: string) => {
    // Очистка предыдущих ошибок
    setErrors({ email: "", password: "" });

    // Базовая валидация
    if (!email.trim() || !password.trim()) {
      setErrors({
        email: !email.trim() ? "Email обязателен" : "",
        password: !password.trim() ? "Пароль обязателен" : "",
      });
      return;
    }

    try {
      console.log("Login attempt:", email);
      const auth = getAuth(app);

      // Вход в Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Page res: ", userCredential);

      // Сохранение сессии
      await signIn(email, password);

      // Перенаправление на главную страницу
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login failed:", error);

      // Показываем ошибки Firebase
      if (error.code === "auth/user-not-found") {
        setErrors({ ...errors, email: "Пользователь не найден" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ ...errors, password: "Неверный пароль" });
      } else if (error.code === "auth/invalid-email") {
        setErrors({ ...errors, email: "Некорректный email" });
      } else if (error.code === "auth/invalid-credential") {
        setErrors({ ...errors, email: "Неверный email или пароль" });
      } else {
        setErrors({ ...errors, email: "Ошибка входа. Попробуйте позже" });
      }
    }
  };

  return (
    <View style={{ backgroundColor: c.background }}>
      <LoginHeader
        title="Добро пожаловать"
        text="Для входа в приложение введите свой номер мобильного телефона и пароль"
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
          label="Пароль"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          placeholder="Введите пароль"
          secureTextEntry
          error={errors.password}
          style={{ marginBottom: 24 }}
        />

        <LinkButton
          href="/"
          title="Забыли пароль?"
          style={{ marginBottom: 28 }}
        />
        <GradientButton
          title="Войти"
          onPress={() => handleLogin(email, password)}
          style={{ marginBottom: 32 }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: c.textMuted }}>Нет аккаунта? </Text>
          <LinkButton href="/signUp" title="Зарегистрироваться" />
        </View>

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
