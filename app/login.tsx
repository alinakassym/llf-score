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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login Page res: ", userCredential);

      // Подготовка данных пользователя
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
      };

      // Сохранение сессии и данных пользователя
      await signIn(email, password, userData);

      // Перенаправление на главную страницу
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login failed:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Показываем ошибки Firebase
      const errorCode = error.code || "";
      const errorMessage = error.message || "";

      if (
        errorCode === "auth/user-not-found" ||
        errorMessage.includes("USER_NOT_FOUND")
      ) {
        setErrors({ email: "Пользователь не найден", password: "" });
      } else if (
        errorCode === "auth/wrong-password" ||
        errorMessage.includes("INVALID_PASSWORD")
      ) {
        setErrors({ email: "", password: "Неверный пароль" });
      } else if (
        errorCode === "auth/invalid-email" ||
        errorMessage.includes("INVALID_EMAIL")
      ) {
        setErrors({ email: "Некорректный email", password: "" });
      } else if (
        errorCode === "auth/invalid-credential" ||
        errorMessage.includes("INVALID_LOGIN_CREDENTIALS")
      ) {
        setErrors({ email: "Неверный email или пароль", password: "" });
      } else if (errorMessage.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
        setErrors({
          email: "Слишком много попыток. Попробуйте позже",
          password: "",
        });
      } else {
        setErrors({
          email: `Ошибка входа: ${errorMessage}`,
          password: "",
        });
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
          <LinkButton href="/sign-up" title="Зарегистрироваться" />
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
