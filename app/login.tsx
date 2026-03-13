import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [accountType, setAccountType] = useState("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (accountType === "cliente") {
      router.push("./register/client/home"); // dashboard cliente
    } else {
      router.push("/register/babysister/BabysitterDashboard"); // dashboard niñera
    }
  };

  return (
    <LinearGradient colors={["#FF7A8A", "#8B6CCB"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.subtitle}>Cuidamos lo que más amas</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.description}>Inicia sesión para continuar</Text>

          {/* TIPO DE CUENTA */}
          <Text style={styles.label}>Tipo de cuenta</Text>

          <View style={styles.accountSelector}>
            <TouchableOpacity
              style={[
                styles.accountButton,
                accountType === "cliente" && styles.accountActive,
              ]}
              onPress={() => setAccountType("cliente")}
            >
              <Text
                style={[
                  styles.accountText,
                  accountType === "cliente" && styles.accountTextActive,
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.accountButton,
                accountType === "ninera" && styles.accountActive,
              ]}
              onPress={() => setAccountType("ninera")}
            >
              <Text
                style={[
                  styles.accountText,
                  accountType === "ninera" && styles.accountTextActive,
                ]}
              >
                Niñera
              </Text>
            </TouchableOpacity>
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>Correo electrónico</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="tu@email.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* FORGOT */}
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* LOGIN */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>O continúa con</Text>
            <View style={styles.line} />
          </View>

          {/* GOOGLE */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>

          {/* REGISTER */}
          <View style={styles.register}>
            <Text style={styles.registerText}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}> Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  subtitle: {
    color: "white",
    marginTop: 10,
    fontSize: 14,
    opacity: 0.9,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  description: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },

  accountSelector: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },

  accountButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  accountActive: {
    backgroundColor: "#FF7A8A",
  },

  accountText: {
    color: "#6B7280",
    fontWeight: "600",
  },

  accountTextActive: {
    color: "white",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  forgot: {
    alignItems: "flex-end",
    marginBottom: 16,
  },

  forgotText: {
    fontSize: 12,
    color: "#8B6CCB",
  },

  loginButton: {
    backgroundColor: "#FF7A8A",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  loginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: "#6B7280",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
  },

  googleIcon: {
    width: 18,
    height: 18,
  },

  googleText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  register: {
    flexDirection: "row",
    justifyContent: "center",
  },

  registerText: {
    fontSize: 13,
    color: "#6B7280",
  },

  registerLink: {
    fontSize: 13,
    color: "#8B6CCB",
    fontWeight: "600",
  },
});
