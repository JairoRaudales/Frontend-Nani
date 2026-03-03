/* import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";

export default function BabysitterRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    age: "",
    email: "",
    phone: "",
    location: "",
    criminalRecordPhoto: null as any,
    idPhoto: null as any,
    facePhoto: null as any,
    presentation: "",
    experience: "",
    skills: [] as string[],
    certificates: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async (field: string) => {
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

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      setFormData({
        ...formData,
        criminalRecordPhoto: result.assets[0],
      });
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else router.replace("/login");
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
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
            <Text style={styles.headerTitle}>Registro de Niñera</Text>
            <Text style={styles.headerSubtitle}>
              Paso {step} de {totalSteps}
            </Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información Personal</Text>

              <TextInput
                placeholder="Nombres"
                style={styles.input}
                onChangeText={(v) => handleInputChange("firstName", v)}
              />
              <TextInput
                placeholder="Apellidos"
                style={styles.input}
                onChangeText={(v) => handleInputChange("lastName", v)}
              />
              <TextInput
                placeholder="Fecha de nacimiento"
                style={styles.input}
              />
              <TextInput
                placeholder="Edad"
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Correo electrónico"
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                placeholder="Teléfono"
                keyboardType="phone-pad"
                style={styles.input}
              />
              <TextInput
                placeholder="Ubicación"
                style={styles.input}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Verificación biométrica y documentos
              </Text>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={pickDocument}
              >
                <Ionicons name="document-outline" size={28} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.criminalRecordPhoto
                    ? formData.criminalRecordPhoto.name
                    : "Subir antecedentes penales"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickImage("idPhoto")}
              >
                <Ionicons name="image-outline" size={28} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.idPhoto
                    ? "Documento cargado"
                    : "Subir foto de identidad"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickImage("facePhoto")}
              >
                <Ionicons name="camera-outline" size={28} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.facePhoto
                    ? "Selfie cargada"
                    : "Tomar selfie"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.mainBtn} onPress={handleNext}>
          <Text style={styles.mainBtnText}>
            {step === totalSteps
              ? "Completar registro"
              : "Continuar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 15 },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "white", fontWeight: "bold", fontSize: 18 },
  headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
  progressBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    marginTop: 20,
  },
  progressFill: {
    height: 6,
    backgroundColor: "white",
    borderRadius: 10,
  },
  content: { padding: 20 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: { fontWeight: "bold", marginBottom: 15 },
  input: {
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadText: { marginTop: 10, color: "#666" },
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
}); */

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";

export default function BabysitterRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    age: "",
    email: "",
    phone: "",
    location: "",
    criminalRecordPhoto: null as any,
    idPhoto: null as any,
    facePhoto: null as any,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async (field: string) => {
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

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets) {
      setFormData({
        ...formData,
        criminalRecordPhoto: result.assets[0],
      });
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else router.replace("/login");
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
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
            <Text style={styles.headerTitle}>Registro de Niñera</Text>
            <Text style={styles.headerSubtitle}>
              Paso {step} de {totalSteps}
            </Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            {/* INFORMACIÓN PERSONAL */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información Personal</Text>

              {/* Nombres */}
              <Text style={styles.label}>Nombres</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Tu nombre"
                  style={styles.input}
                  onChangeText={(v) =>
                    handleInputChange("firstName", v)
                  }
                />
              </View>

              {/* Apellidos */}
              <Text style={styles.label}>Apellidos</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Tus apellidos"
                  style={styles.input}
                  onChangeText={(v) =>
                    handleInputChange("lastName", v)
                  }
                />
              </View>

              {/* Fecha + Edad */}
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>
                    Fecha de nacimiento
                  </Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#9CA3AF"
                    />
                    <TextInput
                      placeholder="DD/MM/AAAA"
                      style={styles.input}
                      onChangeText={(v) =>
                        handleInputChange("birthDate", v)
                      }
                    />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Edad</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="25"
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={(v) =>
                        handleInputChange("age", v)
                      }
                    />
                  </View>
                </View>
              </View>

              {/* Email */}
              <Text style={styles.label}>
                Correo electrónico
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  style={styles.input}
                  onChangeText={(v) =>
                    handleInputChange("email", v)
                  }
                />
              </View>

              {/* Teléfono */}
              <Text style={styles.label}>Teléfono</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="+504 8899 8899"
                  keyboardType="phone-pad"
                  style={styles.input}
                  onChangeText={(v) =>
                    handleInputChange("phone", v)
                  }
                />
              </View>

              {/* Ubicación */}
              <Text style={styles.label}>Ubicación</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#9CA3AF"
                />
                <TextInput
                  placeholder="Ciudad, País"
                  style={styles.input}
                  onChangeText={(v) =>
                    handleInputChange("location", v)
                  }
                />
              </View>
            </View>

            {/* DOCUMENTOS */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Verificación biométrica y documentos
              </Text>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={pickDocument}
              >
                <Ionicons
                  name="document-outline"
                  size={26}
                  color="#999"
                />
                <Text style={styles.uploadText}>
                  {formData.criminalRecordPhoto
                    ? formData.criminalRecordPhoto.name
                    : "Antecedentes penales"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickImage("idPhoto")}
              >
                <Ionicons
                  name="image-outline"
                  size={26}
                  color="#999"
                />
                <Text style={styles.uploadText}>
                  {formData.idPhoto
                    ? "Documento cargado"
                    : "Foto de identidad"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickImage("facePhoto")}
              >
                <Ionicons
                  name="camera-outline"
                  size={26}
                  color="#999"
                />
                <Text style={styles.uploadText}>
                  {formData.facePhoto
                    ? "Selfie cargada"
                    : "Tomar selfie"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={handleNext}
        >
          <Text style={styles.mainBtnText}>
            {step === totalSteps
              ? "Completar registro"
              : "Continuar"}
          </Text>
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

  progressBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    marginTop: 20,
  },

  progressFill: {
    height: 6,
    backgroundColor: "white",
    borderRadius: 10,
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 15,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
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

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 15,
  },

  uploadText: {
    marginTop: 10,
    color: "#666",
  },

  mainBtn: {
    backgroundColor: "#FF768A",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  mainBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});