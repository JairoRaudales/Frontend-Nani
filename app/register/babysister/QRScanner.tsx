import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  onScanSuccess: (data: any) => void;
  expectedLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  type: "checkin" | "checkout";
}

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingLocation, setCheckingLocation] = useState(false);
  const {
    bookingId,
    type,
    address,
    latitude,
    longitude,
    clientName,
    clientPhoto,
    scheduledHours,
    hourlyRate,
    checkInTime,
    totalHours,
  } = useLocalSearchParams();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleScan = async ({ data }: any) => {
    if (type === "checkout") {
      router.replace({
        pathname: "./SessionSummary",
        params: {
          bookingId,
          checkOutTime: Date.now(),
        },
      });
    }

    setScanned(true);

    try {
      setCheckingLocation(true);

      const qrData = JSON.parse(data);

      if (qrData.type !== type) {
        setError("Este QR no corresponde a esta acción.");
        setCheckingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        Number(latitude),
        Number(longitude),
      );

      if (distance > 0.1) {
        setError("No estás en la ubicación correcta.");
        setCheckingLocation(false);
        return;
      }
    } catch (err) {
      setError("QR inválido");
      setCheckingLocation(false);
    }

    if (type === "checkin") {
      router.replace({
        pathname: "./ActiveSession",
        params: {
          bookingId,
          checkInTime: Date.now(),
        },
      });
    }

    if (type === "checkout") {
      router.replace({
        pathname: "./SessionSummary",
        params: {
          bookingId,
          clientName,
          clientPhoto,
          scheduledHours,
          hourlyRate,
          checkInTime,
          checkOutTime: Date.now(),
          totalHours,
        },
      });
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
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

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Permiso de cámara requerido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!checkingLocation && !error && (
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleScan}
        />
      )}

      {checkingLocation && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Verificando ubicación...</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={{ color: "red" }}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setError(null);
              setScanned(false);
            }}
          >
            <Text>Intentar de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.locationBox}>
        <MapPin size={18} color="#FF768A" />
        <Text style={styles.locationText}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationBox: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 14,
  },
});
