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

import { useRouter } from "expo-router";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  QrCode,
  Users,
} from "lucide-react-native";

export default function JobTracking() {
  const router = useRouter();

  const [step, setStep] = useState<"pending" | "arrived">("pending");

  const booking = {
    id: 1,
    clientName: "Laura Pérez",
    clientPhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    time: "2:00 PM - 6:00 PM",
    childrenDetails: "Emma (5 años) y Lucas (3 años)",
    address: "Calle Principal 123",
    payment: 60,
    paymentMethod: "Tarjeta",
    scheduledHours: 4,
    hourlyRate: 15,
    notes: "Alergia al maní en Emma",
    location: {
      latitude: 0,
      longitude: 0,
    },
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      booking.address,
    )}`;
    Linking.openURL(url);
  };

  const confirmArrival = () => {
    setStep("arrived");

    setTimeout(() => {
      router.push("./ActiveSession");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color="white" size={22} />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Seguimiento del Trabajo</Text>
              <Text style={styles.headerSub}>Reserva #{booking.id}</Text>
            </View>
          </View>

          {/* STATUS */}

          <View style={styles.statusCard}>
            {step === "pending" ? (
              <View style={styles.statusRow}>
                <AlertCircle color="white" size={26} />
                <View>
                  <Text style={styles.statusText}>Estado</Text>
                  <Text style={styles.statusValue}>Pendiente de llegada</Text>
                </View>
              </View>
            ) : (
              <View style={styles.statusRow}>
                <CheckCircle color="white" size={26} />
                <View>
                  <Text style={styles.statusText}>Estado</Text>
                  <Text style={styles.statusValue}>Llegada confirmada ✓</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* CLIENT INFO */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información del Cliente</Text>

          <View style={styles.clientRow}>
            <Image
              source={{ uri: booking.clientPhoto }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.clientName}>{booking.clientName}</Text>

              <View style={styles.row}>
                <Clock size={16} color="#886BC1" />
                <Text style={styles.grayText}>{booking.time}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Users size={18} color="#886BC1" />
            <Text style={styles.grayText}>{booking.childrenDetails}</Text>
          </View>
        </View>

        {/* LOCATION */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ubicación</Text>

          <View style={styles.row}>
            <MapPin size={18} color="#FF768A" />
            <Text style={styles.grayText}>{booking.address}</Text>
          </View>

          <TouchableOpacity style={styles.mapButton} onPress={openMap}>
            <Navigation size={18} color="#886BC1" />
            <Text style={styles.mapText}>Abrir en Google Maps</Text>
          </TouchableOpacity>
        </View>

        {/* NOTES */}

        {booking.notes && (
          <View style={styles.notes}>
            <View style={styles.row}>
              <AlertCircle size={18} color="#FF768A" />
              <Text style={styles.cardTitle}>Notas Importantes</Text>
            </View>

            <Text style={styles.grayText}>{booking.notes}</Text>
          </View>
        )}

        {/* PAYMENT */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles del Pago</Text>

          <View style={styles.paymentRow}>
            <Text>Método de pago</Text>
            <Text>{booking.paymentMethod}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text>Horas</Text>
            <Text>{booking.scheduledHours}h</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text>Tarifa</Text>
            <Text>${booking.hourlyRate}/h</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Total estimado</Text>
            <Text style={styles.total}>${booking.payment}</Text>
          </View>
        </View>

        {/* ACTIONS */}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionCard}>
            <Phone size={22} color="#886BC1" />
            <Text>Llamar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <MessageCircle size={22} color="#886BC1" />
            <Text>Mensaje</Text>
          </TouchableOpacity>
        </View>

        {/* CHECK IN */}

        {step === "pending" && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() =>
              router.push({
                pathname: "./QRScanner",
                params: {
                  bookingId: booking.id,
                  type: "checkin",
                  address: booking.address,
                  latitude: booking.location.latitude,
                  longitude: booking.location.longitude,
                },
              })
            }
          >
            <QrCode color="white" size={20} />
            <Text style={styles.confirmText}>Confirmar llegada</Text>
          </TouchableOpacity>
        )}

        {step === "arrived" && (
          <View style={styles.success}>
            <CheckCircle size={40} color="green" />
            <Text style={styles.successText}>¡Llegada Confirmada!</Text>
            <Text>Iniciando sesión...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    backgroundColor: "#886BC1",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: { color: "white", fontSize: 18 },

  headerSub: { color: "white", opacity: 0.8 },

  statusCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 15,
  },

  statusRow: { flexDirection: "row", alignItems: "center", gap: 10 },

  statusText: { color: "white", fontSize: 12 },

  statusValue: { color: "white", fontSize: 16 },

  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  cardTitle: { fontSize: 16, marginBottom: 10 },

  clientRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },

  avatar: { width: 60, height: 60, borderRadius: 30 },

  clientName: { fontSize: 16 },

  row: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 },

  grayText: { color: "#666" },

  mapButton: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F6D9F1",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },

  mapText: { color: "#886BC1" },

  notes: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFF5F7",
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  total: { color: "#886BC1", fontSize: 20 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  actionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "40%",
  },

  confirmButton: {
    backgroundColor: "#FF768A",
    margin: 20,
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  confirmText: { color: "white", fontSize: 16 },

  success: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#E9F9EE",
    alignItems: "center",
  },

  successText: { fontSize: 18, marginTop: 10 },
});
