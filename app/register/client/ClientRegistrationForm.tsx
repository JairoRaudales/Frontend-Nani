import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function ClientRegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    idPhoto: null as any,
    facePhoto: null as any,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async (field: "idPhoto" | "facePhoto") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        [field]: result.assets[0],
      });
    }
  };

  const takeSelfie = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Debes permitir acceso a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        facePhoto: result.assets[0],
      });
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert("Error", "Ingresa tu nombre completo");
      return false;
    }

    if (!formData.email.includes("@")) {
      Alert.alert("Error", "Ingresa un correo válido");
      return false;
    }

    if (!formData.phone.trim()) {
      Alert.alert("Error", "Ingresa tu teléfono");
      return false;
    }

    if (!formData.location.trim()) {
      Alert.alert("Error", "Ingresa tu ubicación");
      return false;
    }

    if (!formData.idPhoto) {
      Alert.alert("Error", "Debes subir una foto de identidad");
      return false;
    }

    if (!formData.facePhoto) {
      Alert.alert("Error", "Debes tomar una selfie");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert("Registro completo", "Tu registro de cliente fue completado");
    router.replace("/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#886BC1", "#FF768A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Registro de Cliente</Text>
            <Text style={styles.headerSubtitle}>Completa tu información</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Información Personal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información Personal</Text>

          <Text style={styles.label}>Nombres</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Tu nombre"
              style={styles.input}
              onChangeText={(v) => handleInputChange("firstName", v)}
            />
          </View>

          <Text style={styles.label}>Apellidos</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Tus apellidos"
              style={styles.input}
              onChangeText={(v) => handleInputChange("lastName", v)}
            />
          </View>

          <Text style={styles.label}>Correo electrónico</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="tu@email.com"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(v) => handleInputChange("email", v)}
            />
          </View>

          <Text style={styles.label}>Teléfono</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="+504 8899 8899"
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={(v) => handleInputChange("phone", v)}
            />
          </View>

          <Text style={styles.label}>Ubicación</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Ciudad, País"
              style={styles.input}
              onChangeText={(v) => handleInputChange("location", v)}
            />
          </View>
        </View>

        {/* Verificación biométrica */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Verificación biométrica</Text>
          <Text style={styles.cardDescription}>
            Para tu seguridad y la de las niñeras, realizamos verificación de
            identidad con reconocimiento facial.
          </Text>

          <Text style={styles.uploadTitle}>
            Foto de identidad (cédula/pasaporte)
          </Text>
          <Text style={styles.uploadSubtitle}>
            Sube una foto clara de tu documento de identidad
          </Text>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => pickImage("idPhoto")}
          >
            <Ionicons name="cloud-upload-outline" size={28} color="#6B7280" />
            <Text style={styles.uploadText}>
              {formData.idPhoto ? "Foto cargada" : "Toca para subir foto"}
            </Text>
            <Text style={styles.uploadHint}>
              Para reconocimiento biométrico
            </Text>

            {formData.idPhoto && (
              <Image
                source={{ uri: formData.idPhoto.uri }}
                style={styles.preview}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.uploadTitle}>Foto del rostro (Selfie)</Text>
          <Text style={styles.uploadSubtitle}>
            Toma una selfie clara con buena iluminación
          </Text>

          <TouchableOpacity style={styles.uploadBox} onPress={takeSelfie}>
            <Ionicons name="camera-outline" size={28} color="#6B7280" />
            <Text style={styles.uploadText}>
              {formData.facePhoto ? "Selfie cargada" : "Toca para tomar selfie"}
            </Text>
            <Text style={styles.uploadHint}>
              Para reconocimiento biométrico
            </Text>

            {formData.facePhoto && (
              <Image
                source={{ uri: formData.facePhoto.uri }}
                style={styles.preview}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Seguridad */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="shield-outline" size={18} color="#886BC1" />
            <Text style={styles.infoTitle}>Seguridad y privacidad</Text>
          </View>

          <Text style={styles.infoText}>
            Tu verificación biométrica garantiza que solo tú puedas acceder a tu
            cuenta. Tus datos están protegidos y solo las niñeras con las que
            interactúes podrán ver tu información de contacto.
          </Text>
        </View>

        <TouchableOpacity style={styles.mainBtn} onPress={handleSubmit}>
          <Text style={styles.mainBtnText}>Completar registro</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 15,
    color: "#2E2E2E",
  },

  cardDescription: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  uploadTitle: {
    fontWeight: "600",
    marginTop: 10,
    color: "#2E2E2E",
  },

  uploadSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 10,
  },

  uploadText: {
    marginTop: 10,
    color: "#666",
  },

  uploadHint: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },

  preview: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#F6D9F1",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  infoTitle: {
    fontWeight: "bold",
    color: "#2E2E2E",
  },

  infoText: {
    color: "#555",
    lineHeight: 20,
  },

  mainBtn: {
    backgroundColor: "#FF768A",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  mainBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});