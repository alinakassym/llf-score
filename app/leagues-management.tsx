import { WEB_MANAGEMENT_URL } from "@/config/env";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

export default function LeaguesManagementScreen() {
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
        // Передаем токен через URL параметр
        const url = `${WEB_MANAGEMENT_URL}/league-management?token=${encodeURIComponent(idToken)}`;
        setWebViewUrl(url);
      } else {
        // Без токена
        setWebViewUrl(`${WEB_MANAGEMENT_URL}/league-management`);
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
      router.push("/management");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={16} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>
          Управление лигами
        </Text>
      </View>

      {/* WebView */}
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={c.textMuted} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
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
