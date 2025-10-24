// app/create-profile.tsx
import GradientButton from "@/components/GradientButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch } from "@/store/hooks";
import { createUserProfile } from "@/store/user.slice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";

export default function CreateProfileScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    identificationNumber: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    identificationNumber: "",
    dateOfBirth: "",
  });

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
      middleName: "",
      identificationNumber: "",
      dateOfBirth: "",
    };

    // Валидация имени
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Имя обязательно";
    }

    // Валидация фамилии
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Фамилия обязательна";
    }

    // Валидация ИИН
    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = "ИИН обязателен";
    } else if (formData.identificationNumber.length !== 12) {
      newErrors.identificationNumber = "ИИН должен содержать 12 цифр";
    }

    // Валидация даты рождения
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Дата рождения обязательна";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = "Формат даты: YYYY-MM-DD";
    }

    setErrors(newErrors);
    return (
      !newErrors.firstName &&
      !newErrors.lastName &&
      !newErrors.identificationNumber &&
      !newErrors.dateOfBirth
    );
  };

  const handleCreateProfile = async () => {
    // Валидация формы
    if (!validateForm()) {
      return;
    }

    try {
      // Подготовка данных для отправки
      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        middleName: formData.middleName.trim() || undefined,
        identificationNumber: formData.identificationNumber.trim(),
        dateOfBirth: formData.dateOfBirth.trim(),
      };

      console.log("Creating profile with data:", profileData);

      // Отправка данных на сервер
      await dispatch(createUserProfile(profileData)).unwrap();

      // Перенаправление на страницу профиля
      console.log("Profile created successfully");
      router.replace("/profile");
    } catch (error: any) {
      console.error("Failed to create profile:", error);
      setErrors({
        ...errors,
        firstName: error || "Ошибка создания профиля. Попробуйте позже",
      });
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View
      style={{ position: "relative", backgroundColor: c.background, flex: 1 }}
    >
      <View
        style={{
          position: "absolute",
          right: 0,
          paddingTop: Platform.OS === "ios" ? 16 : 52,
          paddingHorizontal: 8,
          paddingBottom: 8,
          zIndex: 99,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={{ padding: 4 }}
        >
          <Ionicons name="close" size={24} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
      <LoginHeader
        title="Заполнение профиля"
        text="Пожалуйста, заполните все обязательные поля для создания вашего профиля"
      />
      <ScrollView style={{ padding: 16, height: "100%" }}>
        <TextField
          label="Имя *"
          value={formData.firstName}
          onChangeText={(text) => {
            setFormData({ ...formData, firstName: text });
            if (errors.firstName) setErrors({ ...errors, firstName: "" });
          }}
          placeholder="Введите имя"
          error={errors.firstName}
          style={{ marginBottom: 16 }}
        />

        <TextField
          label="Фамилия *"
          value={formData.lastName}
          onChangeText={(text) => {
            setFormData({ ...formData, lastName: text });
            if (errors.lastName) setErrors({ ...errors, lastName: "" });
          }}
          placeholder="Введите фамилию"
          error={errors.lastName}
          style={{ marginBottom: 16 }}
        />

        <TextField
          label="Отчество"
          value={formData.middleName}
          onChangeText={(text) => {
            setFormData({ ...formData, middleName: text });
            if (errors.middleName) setErrors({ ...errors, middleName: "" });
          }}
          placeholder="Введите отчество (необязательно)"
          error={errors.middleName}
          style={{ marginBottom: 16 }}
        />

        <TextField
          label="ИИН *"
          value={formData.identificationNumber}
          onChangeText={(text) => {
            setFormData({ ...formData, identificationNumber: text });
            if (errors.identificationNumber)
              setErrors({ ...errors, identificationNumber: "" });
          }}
          placeholder="Введите ИИН (12 цифр)"
          keyboardType="numeric"
          maxLength={12}
          error={errors.identificationNumber}
          style={{ marginBottom: 16 }}
        />

        <TextField
          label="Дата рождения *"
          value={formData.dateOfBirth}
          onChangeText={(text) => {
            setFormData({ ...formData, dateOfBirth: text });
            if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: "" });
          }}
          placeholder="YYYY-MM-DD (например, 1990-01-15)"
          error={errors.dateOfBirth}
          style={{ marginBottom: 24 }}
        />

        <GradientButton
          title="Создать профиль"
          onPress={handleCreateProfile}
          style={{ marginBottom: 32 }}
        />
      </ScrollView>
    </View>
  );
}
