import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRScanner from "./QRScanner";

interface Booking {
  id: number;
  clientName: string;
  clientPhoto: string;
  time: string;
  children: number;
  address: string;
  payment: number;
  paymentMethod: string;
  childrenDetails: string;
  notes?: string;
  scheduledHours: number;
  hourlyRate: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface JobTrackingProps {
  booking: Booking;
  onBack: () => void;
  onCheckIn: (data: any) => void;
}

export default function JobTracking({
  booking,
  onBack,
  onCheckIn,
}: JobTrackingProps) {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [step, setStep] = useState<"pending" | "arrived">("pending");

  const handleQRScanSuccess = (data: any) => {
    setShowQRScanner(false);
    setStep("arrived");

    setTimeout(() => {
      onCheckIn(data);
    }, 1500);
  };

  const handleOpenMap = () => {
    const address = encodeURIComponent(booking.address);
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Seguimiento del Trabajo</Text>
              <Text style={styles.headerSubtitle}>Reserva #{booking.id}</Text>
            </View>
          </View>

          {/* STATUS */}
          <View style={styles.statusCard}>
            {step === "pending" ? (
              <>
                <View style={styles.iconCircleYellow}>
                  <Feather name="alert-circle" size={22} color="white" />
                </View>
                <View>
                  <Text style={styles.statusLabel}>Estado</Text>
                  <Text style={styles.statusText}>Pendiente de llegada</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.iconCircleGreen}>
                  <Feather name="check-circle" size={22} color="white" />
                </View>
                <View>
                  <Text style={styles.statusLabel}>Estado</Text>
                  <Text style={styles.statusText}>Llegada confirmada ✓</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* CLIENTE */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información del Cliente</Text>

            <View style={styles.row}>
              <Image
                source={{ uri: booking.clientPhoto }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{booking.clientName}</Text>

                <View style={styles.rowSmall}>
                  <Feather name="clock" size={16} color="#886BC1" />
                  <Text style={styles.grayText}>{booking.time}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowSmall}>
              <Ionicons name="people" size={18} color="#886BC1" />
              <View>
                <Text style={styles.label}>Niños a cuidar</Text>
                <Text style={styles.text}>{booking.childrenDetails}</Text>
              </View>
            </View>
          </View>

          {/* UBICACION */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ubicación</Text>

            <View style={styles.rowSmall}>
              <Ionicons name="location" size={18} color="#FF768A" />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{booking.address}</Text>
                <Text style={styles.label}>Asegúrate de llegar a tiempo</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.mapBtn} onPress={handleOpenMap}>
              <Feather name="navigation" size={16} color="#886BC1" />
              <Text style={styles.mapBtnText}>Abrir en Google Maps</Text>
            </TouchableOpacity>
          </View>

          {/* NOTAS */}
          {booking.notes && (
            <View style={styles.notesCard}>
              <View style={styles.rowSmall}>
                <Feather name="alert-circle" size={18} color="#FF768A" />
                <Text style={styles.cardTitle}>Notas Importantes</Text>
              </View>

              <Text style={styles.grayText}>{booking.notes}</Text>
            </View>
          )}

          {/* PAGOS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Detalles del Pago</Text>

            <View style={styles.spaceBetween}>
              <Text style={styles.grayText}>Método de pago</Text>
              <Text>{booking.paymentMethod}</Text>
            </View>

            <View style={styles.spaceBetween}>
              <Text style={styles.grayText}>Horas</Text>
              <Text>{booking.scheduledHours}h</Text>
            </View>

            <View style={styles.spaceBetween}>
              <Text style={styles.grayText}>Tarifa</Text>
              <Text>${booking.hourlyRate}/h</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>${booking.payment}</Text>
            </View>
          </View>

          {/* ACCIONES */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="call" size={22} color="#886BC1" />
              <Text>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble" size={22} color="#886BC1" />
              <Text>Mensaje</Text>
            </TouchableOpacity>
          </View>

          {/* CHECK IN */}
          {step === "pending" && (
            <>
              <View style={styles.qrInfo}>
                <Text style={styles.text}>
                  Escanea el QR del cliente para confirmar llegada.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkBtn}
                onPress={() => setShowQRScanner(true)}
              >
                <Ionicons name="qr-code" size={20} color="white" />
                <Text style={styles.checkText}>Confirmar Llegada</Text>
              </TouchableOpacity>
            </>
          )}

          {step === "arrived" && (
            <View style={styles.successBox}>
              <Feather name="check-circle" size={40} color="green" />
              <Text style={styles.successText}>¡Llegada Confirmada!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* QR SCANNER */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanSuccess={handleQRScanSuccess}
        expectedLocation={{
          address: booking.address,
          latitude: booking.location.latitude,
          longitude: booking.location.longitude,
        }}
        type="checkin"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    backgroundColor: "#886BC1",
    paddingTop: 50,
    padding: 20,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  headerTitle: { color: "white", fontSize: 18 },
  headerSubtitle: { color: "#ddd", fontSize: 12 },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 15,
  },

  iconCircleYellow: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#facc15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  iconCircleGreen: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  statusLabel: { color: "#eee", fontSize: 12 },
  statusText: { color: "white", fontWeight: "bold" },

  content: { padding: 20 },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  cardTitle: { fontWeight: "bold", marginBottom: 10 },

  row: { flexDirection: "row", alignItems: "center" },
  rowSmall: { flexDirection: "row", alignItems: "center", gap: 10 },

  avatar: { width: 60, height: 60, borderRadius: 30 },

  name: { fontWeight: "bold" },
  grayText: { color: "#777" },
  text: { color: "#333" },
  label: { fontSize: 12, color: "#999" },

  divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },

  mapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F6D9F1",
    borderRadius: 10,
    marginTop: 10,
  },

  mapBtnText: { marginLeft: 5, color: "#886BC1" },

  notesCard: {
    backgroundColor: "#FFF5F7",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  totalText: { fontWeight: "bold" },
  totalAmount: { color: "#886BC1", fontSize: 20 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 5,
  },

  qrInfo: {
    backgroundColor: "#F6D9F1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  checkBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF768A",
    padding: 15,
    borderRadius: 15,
  },

  checkText: { color: "white", marginLeft: 10 },

  successBox: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6fffa",
    borderRadius: 15,
  },

  successText: { marginTop: 10, fontWeight: "bold", color: "green" },
});
