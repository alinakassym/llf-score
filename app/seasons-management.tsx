// llf-score/app/seasons-management.tsx

import ModalHeader from "@/components/ModalHeader";
import { WEB_MANAGEMENT_URL } from "@/config/env";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { WebView, WebViewNavigation } from "react-native-webview";

export default function SeasonsManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const { getIdToken } = useSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string>("");

  useEffect(() => {
    const loadToken = async () => {
      const idToken = await getIdToken();

      if (idToken) {
        // Передаем токен через hash (#), не query (?)
        // Hash не отправляется на сервер и не попадает в логи
        const url = `${WEB_MANAGEMENT_URL}/seasons-management#auth_token=${encodeURIComponent(idToken)}`;
        setWebViewUrl(url);
      } else {
        // Без токена
        setWebViewUrl(`${WEB_MANAGEMENT_URL}/seasons-management`);
      }
    };
    loadToken();
  }, [getIdToken]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleError = () => {
    setError("Не удалось загрузить страницу");
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    webViewRef.current?.reload();
  };

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      router.back();
    }
  };

  // Выбираем правильный контейнер для Android анимации
  const Container: any = Platform.OS === "android" ? Animated.View : View;
  const containerProps =
    Platform.OS === "android"
      ? { entering: FadeIn.duration(60), exiting: FadeOut.duration(60) }
      : {};

  return (
    <Container style={styles.container} {...containerProps}>
      {/* Header с градиентом */}
      <LinearGradient
        colors={c.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ModalHeader title="Управление сезонами" onClose={handleGoBack} />
      </LinearGradient>

      {/* WebView */}
      <View style={[styles.content, { backgroundColor: c.background }]}>
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={64}
              color={c.textMuted}
            />
            <Text style={[styles.errorText, { color: c.text }]}>{error}</Text>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: c.primary }]}
              onPress={handleRetry}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.retryButtonText}>Попробовать снова</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={c.primary} />
                <Text style={[styles.loadingText, { color: c.textMuted }]}>
                  Загрузка...
                </Text>
              </View>
            )}
            {webViewUrl && (
              <WebView
                ref={webViewRef}
                source={{ uri: webViewUrl }}
                style={styles.webview}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={handleLoad}
                onError={handleError}
                onHttpError={handleError}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsBackForwardNavigationGestures={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // Security settings
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                // Performance settings
                cacheEnabled={true}
                incognito={false}
                // Error handling
                renderError={() => (
                  <View style={styles.errorContainer}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={64}
                      color={c.textMuted}
                    />
                    <Text style={[styles.errorText, { color: c.text }]}>
                      Ошибка загрузки
                    </Text>
                  </View>
                )}
              />
            )}
          </>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
