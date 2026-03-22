import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { ArrowRight, Camera, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BabysitterWelcomeSetup() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  );

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Se necesita permiso para acceder a tus fotos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePhoto(uri);
      setPreviewUrl(uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Sparkles color="white" size={40} />
        </View>

        {/* Title */}
        <Text style={styles.title}>¡Bienvenida a Nani! 🎉</Text>

        <Text style={styles.subtitle}>
          Para completar tu perfil exitosamente, actualiza tu foto de perfil
        </Text>

        {/* Photo Preview */}
        <View style={styles.photoWrapper}>
          <Image source={{ uri: previewUrl }} style={styles.photo} />

          <View style={styles.cameraIcon}>
            <Camera color="white" size={18} />
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Esta es la foto que enviaste en tu registro de verificación. Por
            favor actualizarla para completar tu perfil.
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Camera color="white" size={20} />
          <Text style={styles.buttonText}>Actualizar foto de perfil</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("./BabysitterAvailabilitySetup")}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        <View style={styles.dots}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.progressText}>Paso 1 de 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#886BC1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 32,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#886BC1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },

  photoWrapper: {
    position: "relative",
    marginBottom: 20,
  },

  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#F6D9F1",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    backgroundColor: "#FF768A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  infoBox: {
    backgroundColor: "#F6D9F1",
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
  },

  infoText: {
    textAlign: "center",
    color: "#2E2E2E",
    fontSize: 13,
  },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#886BC1",
    padding: 15,
    borderRadius: 18,
    width: "100%",
    gap: 8,
    marginBottom: 10,
  },

  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF768A",
    padding: 15,
    borderRadius: 18,
    width: "100%",
    gap: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  progress: {
    marginTop: 20,
    alignItems: "center",
  },

  dots: {
    flexDirection: "row",
    gap: 6,
  },

  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },

  dot: {
    width: 10,
    height: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 5,
  },

  progressText: {
    marginTop: 6,
    color: "white",
  },
});
