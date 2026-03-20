import { Feather, Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: any) => void;
  expectedLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  type: "checkin" | "checkout";
}

export default function QRScanner({
  isOpen,
  onClose,
  onScanSuccess,
  expectedLocation,
  type,
}: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationChecking, setLocationChecking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestPermissions();
    }
  }, [isOpen]);

  // ✅ Permisos
  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await BarCodeScanner.requestPermissionsAsync();

      const { status: locStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (cameraStatus === "granted" && locStatus === "granted") {
        setHasPermission(true);
      } else {
        setError("Permisos de cámara o ubicación denegados");
        setHasPermission(false);
      }
    } catch {
      setError("Error solicitando permisos");
      setHasPermission(false);
    }
  };

  // ✅ Escaneo QR
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    try {
      setLocationChecking(true);

      // Parse seguro
      let qrData: any;
      try {
        qrData = JSON.parse(data);
      } catch {
        throw new Error("QR inválido");
      }

      // Validar tipo
      if (qrData.type !== type) {
        setError(
          `Este código es para ${
            qrData.type === "checkin" ? "entrada" : "salida"
          }`,
        );
        resetScanner();
        return;
      }

      // Obtener ubicación
      const userLocation = await getCurrentLocation();

      // Calcular distancia
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        qrData.location.latitude,
        qrData.location.longitude,
      );

      if (distance > 0.1) {
        setError("No estás en la ubicación correcta");
        resetScanner();
        return;
      }

      // ✅ Éxito
      onScanSuccess({
        ...qrData,
        scannedAt: Date.now(),
        location: userLocation,
      });

      setLocationChecking(false);
      onClose();
    } catch (err: any) {
      setError(err.message || "Error procesando QR");
      resetScanner();
    }
  };

  // ✅ Reset limpio
  const resetScanner = () => {
    setLocationChecking(false);
    setScanned(false);
  };

  // ✅ Ubicación
  const getCurrentLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    } catch {
      return {
        latitude: expectedLocation.latitude,
        longitude: expectedLocation.longitude,
      };
    }
  };

  // ✅ Distancia (Haversine)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* TITLE */}
          <Text style={styles.title}>
            {type === "checkin"
              ? "Escanear QR - Entrada"
              : "Escanear QR - Salida"}
          </Text>

          {/* SCANNER */}
          {!error && !locationChecking && hasPermission && (
            <View style={styles.scannerBox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />

              <View style={styles.scanOverlay}>
                <Ionicons name="camera" size={18} color="#FF768A" />
                <Text style={styles.scanText}>Apunta al código QR...</Text>
              </View>
            </View>
          )}

          {/* LOADING */}
          {locationChecking && (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="#886BC1" />
              <Text style={{ marginTop: 10 }}>Verificando ubicación...</Text>
            </View>
          )}

          {/* ERROR */}
          {error && (
            <View style={styles.errorBox}>
              <Feather name="x-circle" size={40} color="red" />
              <Text style={styles.errorText}>{error}</Text>

              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => {
                  setError(null);
                  resetScanner();
                }}
              >
                <Text style={{ color: "white" }}>Intentar de nuevo</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* UBICACIÓN */}
          {!error && !locationChecking && (
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Ubicación esperada:</Text>
              <Text>{expectedLocation.address}</Text>
            </View>
          )}

          {/* BOTONES */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mockBtn}
              onPress={() => {
                onScanSuccess({
                  type,
                  scannedAt: Date.now(),
                  location: {
                    latitude: expectedLocation.latitude,
                    longitude: expectedLocation.longitude,
                  },
                });
                onClose();
              }}
            >
              <Text style={{ color: "white" }}>Simular QR ✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  scannerBox: {
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },

  scanOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },

  scanText: {
    marginLeft: 5,
    fontSize: 12,
  },

  centerBox: {
    alignItems: "center",
    padding: 30,
  },

  errorBox: {
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },

  retryBtn: {
    backgroundColor: "#FF768A",
    padding: 10,
    borderRadius: 10,
  },

  infoBox: {
    backgroundColor: "#FFF5F7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 12,
    color: "#777",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },

  mockBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#886BC1",
    borderRadius: 10,
    alignItems: "center",
  },
});
