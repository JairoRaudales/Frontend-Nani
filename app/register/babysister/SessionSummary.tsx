import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Booking {
  id: number;
  clientName: string;
  clientPhoto: string;
  scheduledHours: number;
  hourlyRate: number;
}

interface Props {
  booking: Booking;
  checkInTime: number;
  checkOutTime: number;
  totalHours: number;
  onComplete: () => void;
}

export default function SessionSummary({
  booking,
  checkInTime,
  checkOutTime,
  totalHours,
  onComplete,
}: Props) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  const checkInDate = new Date(checkInTime);
  const checkOutDate = new Date(checkOutTime);

  const scheduledHours = booking.scheduledHours;
  const overtimeHours = Math.max(0, totalHours - scheduledHours);

  const basePay = scheduledHours * booking.hourlyRate;
  const overtimePay = overtimeHours * booking.hourlyRate;

  const lateParentMinutes = 15;
  const lateParentHours = lateParentMinutes / 60;
  const lateParentPay = lateParentHours * booking.hourlyRate;

  const totalPayment = basePay + overtimePay + lateParentPay;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const handleSubmit = () => {
    console.log({ rating, comments, totalPayment });
    onComplete();
  };

  const getRatingText = () => {
    switch (rating) {
      case 5:
        return "¡Excelente experiencia!";
      case 4:
        return "Muy buena experiencia";
      case 3:
        return "Experiencia aceptable";
      case 2:
        return "Experiencia regular";
      default:
        return "Mala experiencia";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backBtn} onPress={onComplete}>
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>Resumen de Sesión</Text>
              <Text style={styles.headerSubtitle}>Trabajo completado</Text>
            </View>
          </View>

          <View style={styles.successBox}>
            <Feather name="check-circle" size={22} color="white" />
            <View>
              <Text style={styles.successTitle}>Sesión Finalizada</Text>
              <Text style={styles.successSub}>Reserva #{booking.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* CLIENTE */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Image
                source={{ uri: booking.clientPhoto }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{booking.clientName}</Text>
                <Text style={styles.gray}>Cliente</Text>
              </View>
            </View>
          </View>

          {/* TIEMPO */}
          <View style={styles.card}>
            <View style={styles.rowSmall}>
              <Feather name="clock" size={18} color="#886BC1" />
              <Text style={styles.title}>Registro de Tiempo</Text>
            </View>

            <View style={styles.spaceBetween}>
              <View>
                <Text style={styles.gray}>Entrada</Text>
                <Text>{formatTime(checkInDate)}</Text>
              </View>
              <View>
                <Text style={styles.gray}>Salida</Text>
                <Text>{formatTime(checkOutDate)}</Text>
              </View>
            </View>

            <View style={styles.spaceBetween}>
              <Text>Total trabajado</Text>
              <Text style={styles.totalTime}>{formatDuration(totalHours)}</Text>
            </View>
          </View>

          {/* PAGO */}
          <View style={styles.card}>
            <View style={styles.rowSmall}>
              <Feather name="dollar-sign" size={18} color="#886BC1" />
              <Text style={styles.title}>Desglose de Pago</Text>
            </View>

            <View style={styles.spaceBetween}>
              <Text>Horas programadas</Text>
              <Text>${basePay.toFixed(2)}</Text>
            </View>

            {overtimeHours > 0 && (
              <View style={styles.highlightOrange}>
                <Text>Horas extra</Text>
                <Text>+${overtimePay.toFixed(2)}</Text>
              </View>
            )}

            {lateParentMinutes > 0 && (
              <View style={styles.highlightBlue}>
                <Text>Espera cliente</Text>
                <Text>+${lateParentPay.toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>${totalPayment.toFixed(2)}</Text>
            </View>
          </View>

          {/* ALERTA */}
          {(overtimeHours > 0 || lateParentMinutes > 0) && (
            <View style={styles.alertBox}>
              <Feather name="alert-circle" size={18} color="#FF768A" />
              <Text style={styles.alertText}>Tiempo adicional cobrado</Text>
            </View>
          )}

          {/* RATING */}
          <View style={styles.card}>
            <Text style={styles.title}>Calificar al Cliente</Text>

            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={30}
                    color="#FF768A"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.grayCenter}>{getRatingText()}</Text>
          </View>

          {/* COMENTARIOS */}
          <View style={styles.card}>
            <Text style={styles.title}>Comentarios</Text>

            <TextInput
              value={comments}
              onChangeText={setComments}
              placeholder="Escribe aquí..."
              multiline
              style={styles.input}
            />
          </View>

          {/* BOTÓN */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Finalizar y Enviar</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              El pago se procesará en 24-48 horas.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  headerTitle: { color: "white", fontSize: 18 },
  headerSubtitle: { color: "#ddd", fontSize: 12 },

  successBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 15,
  },

  successTitle: { color: "white", fontWeight: "bold" },
  successSub: { color: "#eee", fontSize: 12 },

  content: { padding: 20 },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowSmall: { flexDirection: "row", alignItems: "center", gap: 10 },

  avatar: { width: 60, height: 60, borderRadius: 30 },

  name: { fontWeight: "bold" },
  gray: { color: "#777", fontSize: 12 },

  title: { fontWeight: "bold", marginBottom: 10 },

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
  totalAmount: { color: "#886BC1", fontSize: 22 },

  totalTime: { color: "#886BC1", fontWeight: "bold" },

  highlightOrange: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF4E5",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  highlightBlue: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EAF4FF",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  alertBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF5F7",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  alertText: { color: "#FF768A" },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },

  grayCenter: { textAlign: "center", color: "#777" },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#FF768A",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: { color: "white", fontWeight: "bold" },

  infoBox: {
    backgroundColor: "#F6D9F1",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  infoText: { textAlign: "center", fontSize: 12 },
});
