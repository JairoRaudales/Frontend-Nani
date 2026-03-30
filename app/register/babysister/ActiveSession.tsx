import { router, useLocalSearchParams } from "expo-router";
import {
  AlertCircle,
  Clock,
  DollarSign,
  MapPin,
  QrCode,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ActiveSession() {
  const {
    bookingId,
    clientName,
    clientPhoto,
    address,
    scheduledHours,
    hourlyRate,
    children,
    childrenDetails,
    latitude,
    longitude,
    checkInTime,
  } = useLocalSearchParams();

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - Number(checkInTime)) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalHours = elapsedTime / 3600;
  const scheduledSeconds = Number(scheduledHours) * 3600;

  const isOvertime = elapsedTime > scheduledSeconds;
  const overtimeSeconds = isOvertime ? elapsedTime - scheduledSeconds : 0;
  const overtimeHours = overtimeSeconds / 3600;

  const basePay = Number(scheduledHours) * Number(hourlyRate);
  const overtimePay = overtimeHours * Number(hourlyRate);
  const totalPay = basePay + overtimePay;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sesión Activa</Text>
        <Text style={styles.headerSubtitle}>En progreso</Text>

        <View style={styles.timerBox}>
          <Text style={styles.timerLabel}>Tiempo transcurrido</Text>
          <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>

          <View style={styles.rowCenter}>
            <Clock color="#fff" size={16} />
            <Text style={styles.scheduledText}>
              Programado: {scheduledHours}h
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* ALERTA TIEMPO EXTRA */}
        {isOvertime && (
          <View style={styles.overtimeBox}>
            <AlertCircle color="#F97316" size={24} />
            <View>
              <Text style={styles.overtimeTitle}>Tiempo Extra</Text>
              <Text style={styles.overtimeText}>
                Has excedido el tiempo por {formatTime(overtimeSeconds)}
              </Text>
            </View>
          </View>
        )}

        {/* CLIENT INFO */}
        <View style={styles.card}>
          <View style={styles.clientRow}>
            <Image
              source={{ uri: clientPhoto as string }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.clientName}>{clientName}</Text>
              <Text style={styles.grayText}>{children} niños</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin color="#886BC1" size={20} />
            <View>
              <Text style={styles.label}>Ubicación</Text>
              <Text style={styles.value}>{address}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Clock color="#886BC1" size={20} />
            <View>
              <Text style={styles.label}>Niños a cuidar</Text>
              <Text style={styles.value}>{childrenDetails}</Text>
            </View>
          </View>
        </View>

        {/* PAYMENT */}
        <View style={styles.card}>
          <View style={styles.row}>
            <DollarSign color="#886BC1" size={20} />
            <Text style={styles.cardTitle}>Resumen de Pago</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.grayText}>
              Horas programadas ({scheduledHours}h)
            </Text>
            <Text>${basePay.toFixed(2)}</Text>
          </View>

          {overtimeHours > 0 && (
            <View style={styles.paymentRow}>
              <Text style={{ color: "#F97316" }}>
                Tiempo extra ({overtimeHours.toFixed(2)}h)
              </Text>
              <Text style={{ color: "#F97316" }}>
                +${overtimePay.toFixed(2)}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total estimado</Text>
            <Text style={styles.totalAmount}>${totalPay.toFixed(2)}</Text>
          </View>

          <Text style={styles.timeInfo}>
            Tiempo actual: {totalHours.toFixed(2)} horas
          </Text>
        </View>

        {/* PROGRESS */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Text style={styles.grayText}>Progreso</Text>

            <Text style={styles.progressPercent}>
              {Math.min(100, (elapsedTime / scheduledSeconds) * 100).toFixed(0)}
              %
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(
                    100,
                    (elapsedTime / scheduledSeconds) * 100,
                  )}%`,
                  backgroundColor: isOvertime ? "#F97316" : "#FF768A",
                },
              ]}
            />
          </View>
        </View>

        {/* BOTÓN SALIDA */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            router.push({
              pathname: "./QRScanner",
              params: {
                type: "checkout",
                bookingId,
                address,
                latitude,
                longitude,
              },
            })
          }
        >
          <QrCode color="#fff" size={20} />
          <Text style={styles.checkoutText}>Marcar Salida</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Para finalizar la sesión escanea el código QR que mostrará el
            cliente. Se verificará tu ubicación automáticamente.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    backgroundColor: "#886BC1",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerSubtitle: { color: "#fff", opacity: 0.8 },

  timerBox: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  timerLabel: { color: "#fff", opacity: 0.8 },
  timer: { color: "#fff", fontSize: 40, fontWeight: "bold" },

  rowCenter: { flexDirection: "row", alignItems: "center", gap: 6 },
  scheduledText: { color: "#fff", marginLeft: 5 },

  content: { padding: 20, gap: 20 },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },

  clientRow: { flexDirection: "row", alignItems: "center", gap: 12 },

  avatar: { width: 60, height: 60, borderRadius: 30 },

  clientName: { fontSize: 18, fontWeight: "600" },

  grayText: { color: "#666" },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  label: { fontSize: 12, color: "#888" },

  value: { fontSize: 14 },

  cardTitle: { fontSize: 18, fontWeight: "600", marginLeft: 5 },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  totalRow: {
    borderTopWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalText: { fontWeight: "600" },

  totalAmount: { fontSize: 24, color: "#886BC1", fontWeight: "bold" },

  timeInfo: { textAlign: "center", marginTop: 8, fontSize: 12, color: "#888" },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  progressPercent: { color: "#886BC1" },

  progressBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  progressFill: { height: 10, borderRadius: 10 },

  checkoutButton: {
    backgroundColor: "#FF768A",
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  checkoutText: { color: "#fff", fontSize: 16 },

  infoBox: {
    backgroundColor: "#F6D9F1",
    padding: 15,
    borderRadius: 15,
  },

  infoText: { textAlign: "center", fontSize: 12, color: "#555" },

  overtimeBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF7ED",
    borderWidth: 2,
    borderColor: "#FDBA74",
    padding: 15,
    borderRadius: 20,
  },

  overtimeTitle: { color: "#9A3412", fontWeight: "600" },

  overtimeText: { color: "#C2410C", fontSize: 12 },
});
