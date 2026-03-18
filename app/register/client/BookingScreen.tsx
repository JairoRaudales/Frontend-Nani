import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type TimeSlot = {
  id: string;
  label: string;
  time: string;
};

type BabysitterBookingInfo = {
  id: number;
  name: string;
  photo: string;
  hourlyRate: number;
};

export default function BookingScreen() {
  const router = useRouter();
  const { babysitterId } = useLocalSearchParams();

  const id = Number(babysitterId);

  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>("morning");
  const [duration, setDuration] = useState<number>(4);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const babysitters: BabysitterBookingInfo[] = [
    {
      id: 1,
      name: "María González",
      photo:
        "https://images.unsplash.com/photo-1584446456661-1039ed1a39d7?w=200&h=200&fit=crop",
      hourlyRate: 15,
    },
    {
      id: 2,
      name: "Ana Rodríguez",
      photo:
        "https://images.unsplash.com/photo-1565310561974-f2dc282230d9?w=200&h=200&fit=crop",
      hourlyRate: 18,
    },
    {
      id: 3,
      name: "Sofía Martínez",
      photo:
        "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?w=200&h=200&fit=crop",
      hourlyRate: 20,
    },
    {
      id: 4,
      name: "Laura Pérez",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      hourlyRate: 14,
    },
  ];

  const babysitter = useMemo(() => {
    return babysitters.find((item) => item.id === id);
  }, [id]);

  const timeSlots: TimeSlot[] = [
    { id: "morning", label: "Mañana", time: "08:00 - 12:00" },
    { id: "afternoon", label: "Tarde", time: "14:00 - 18:00" },
    { id: "evening", label: "Noche", time: "18:00 - 22:00" },
  ];

  const calendarDays = [10, 11, 12, 13, 14, 15, 16];

  const calculateTotal = () => {
    const hourlyRate = babysitter?.hourlyRate ?? 0;
    const subtotal = hourlyRate * duration;
    const serviceFee = subtotal * 0.1;

    return {
      subtotal,
      serviceFee,
      total: subtotal + serviceFee,
    };
  };

  const { subtotal, serviceFee, total } = calculateTotal();

  const handleConfirm = () => {
    if (!babysitter) return;

    const selectedSlot = timeSlots.find((slot) => slot.id === selectedTime);

    Alert.alert(
      "Reserva confirmada",
      `Has reservado con ${babysitter.name}\nFecha: 2026-02-${selectedDate}\nHorario: ${
        selectedSlot?.label ?? ""
      }\nDuración: ${duration} horas\nTotal: $${total.toFixed(2)}`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  if (!babysitter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>Reserva no disponible</Text>
          <Text style={styles.notFoundText}>
            No se encontró la niñera seleccionada.
          </Text>

          <TouchableOpacity
            style={styles.backButtonAlone}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonAloneText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerBackButton}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Nueva Reserva</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.babysitterCard}>
            <Image
              source={{ uri: babysitter.photo }}
              style={styles.babysitterImage}
            />
            <View>
              <Text style={styles.babysitterName}>{babysitter.name}</Text>
              <Text style={styles.babysitterRate}>
                ${babysitter.hourlyRate}/hora
              </Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="calendar-outline" size={20} color="#886BC1" />
              </View>
              <Text style={styles.sectionTitle}>Fecha</Text>
            </View>

            <View style={styles.weekRow}>
              {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                <Text key={day} style={styles.weekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysRow}>
              {calendarDays.map((day) => {
                const isSelected = day === selectedDate;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      isSelected && styles.dayButtonSelected,
                    ]}
                    onPress={() => setSelectedDate(day)}
                  >
                    <Text
                      style={[
                        styles.dayButtonText,
                        isSelected && styles.dayButtonTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons name="time-outline" size={20} color="#886BC1" />
              </View>
              <Text style={styles.sectionTitle}>Horario</Text>
            </View>

            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.id;

              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedTime(slot.id)}
                >
                  <View>
                    <Text style={styles.optionTitle}>{slot.label}</Text>
                    <Text style={styles.optionSubtitle}>{slot.time}</Text>
                  </View>

                  {isSelected && (
                    <View style={styles.selectedCircle}>
                      <View style={styles.selectedCircleInner} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitlePlain}>Duración</Text>

            <View style={styles.durationRow}>
              <TouchableOpacity
                style={styles.durationMinusButton}
                onPress={() => setDuration(Math.max(1, duration - 1))}
              >
                <Text style={styles.durationMinusText}>-</Text>
              </TouchableOpacity>

              <View style={styles.durationCenter}>
                <Text style={styles.durationValue}>{duration}</Text>
                <Text style={styles.durationLabel}>horas</Text>
              </View>

              <TouchableOpacity
                style={styles.durationPlusButton}
                onPress={() => setDuration(duration + 1)}
              >
                <Text style={styles.durationPlusText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitlePlain}>Método de pago</Text>

            <TouchableOpacity
              style={[
                styles.optionCard,
                paymentMethod === "card" && styles.optionCardSelected,
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.sectionIcon}>
                  <Ionicons name="card-outline" size={20} color="#886BC1" />
                </View>

                <View>
                  <Text style={styles.optionTitle}>
                    Tarjeta de crédito/débito
                  </Text>
                  <Text style={styles.optionSubtitle}>
                    Pago dentro de la app
                  </Text>
                </View>
              </View>

              {paymentMethod === "card" && (
                <View style={styles.selectedCircle}>
                  <View style={styles.selectedCircleInner} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                paymentMethod === "cash" && styles.optionCardSelected,
              ]}
              onPress={() => setPaymentMethod("cash")}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.sectionIcon}>
                  <FontAwesome5 name="dollar-sign" size={18} color="#886BC1" />
                </View>

                <View>
                  <Text style={styles.optionTitle}>Efectivo</Text>
                  <Text style={styles.optionSubtitle}>
                    Pago directo a la niñera
                  </Text>
                </View>
              </View>

              {paymentMethod === "cash" && (
                <View style={styles.selectedCircle}>
                  <View style={styles.selectedCircleInner} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.summaryIcon}>
                <Ionicons name="card-outline" size={20} color="#886BC1" />
              </View>
              <Text style={styles.sectionTitle}>Resumen de pago</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                Subtotal ({duration} horas)
              </Text>
              <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Tarifa de servicio</Text>
              <Text style={styles.summaryText}>${serviceFee.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
            </View>

            <View style={styles.paymentPreview}>
              <View style={styles.paymentPreviewIcon}>
                <Ionicons name="card-outline" size={16} color="#FFFFFF" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.paymentPreviewTitle}>
                  {paymentMethod === "card"
                    ? "Visa •••• 4242"
                    : "Pago en efectivo"}
                </Text>
                <Text style={styles.paymentPreviewSubtitle}>
                  Método de pago
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>Confirmar reserva</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    backgroundColor: "#886BC1",
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
  },
  babysitterCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  babysitterImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  babysitterName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  babysitterRate: {
    color: "#886BC1",
    fontSize: 15,
    fontWeight: "600",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6D9F1",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#2E2E2E",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitlePlain: {
    color: "#2E2E2E",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDayText: {
    width: "13%",
    textAlign: "center",
    color: "#A0A0A0",
    fontSize: 13,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    width: "13%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#FF768A",
  },
  dayButtonText: {
    color: "#2E2E2E",
    fontSize: 14,
    fontWeight: "600",
  },
  dayButtonTextSelected: {
    color: "#FFFFFF",
  },
  optionCard: {
    borderWidth: 2,
    borderColor: "#F1F1F1",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionCardSelected: {
    borderColor: "#FF768A",
    backgroundColor: "#FFF7F9",
  },
  optionTitle: {
    color: "#2E2E2E",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  optionSubtitle: {
    color: "#8D8D8D",
    fontSize: 13,
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF768A",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  durationMinusButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
  },
  durationMinusText: {
    fontSize: 24,
    color: "#2E2E2E",
    fontWeight: "600",
  },
  durationCenter: {
    alignItems: "center",
  },
  durationValue: {
    color: "#886BC1",
    fontSize: 32,
    fontWeight: "700",
  },
  durationLabel: {
    color: "#8D8D8D",
    fontSize: 13,
  },
  durationPlusButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF768A",
    justifyContent: "center",
    alignItems: "center",
  },
  durationPlusText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  summaryCard: {
    backgroundColor: "#F6D9F1",
    borderRadius: 20,
    padding: 18,
    marginBottom: 10,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    color: "#2E2E2E",
    fontSize: 14,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(136,107,193,0.25)",
    marginVertical: 8,
  },
  summaryTotalLabel: {
    color: "#886BC1",
    fontSize: 17,
    fontWeight: "700",
  },
  summaryTotalValue: {
    color: "#886BC1",
    fontSize: 22,
    fontWeight: "700",
  },
  paymentPreview: {
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paymentPreviewIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#886BC1",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentPreviewTitle: {
    color: "#2E2E2E",
    fontSize: 13,
    fontWeight: "600",
  },
  paymentPreviewSubtitle: {
    color: "#8D8D8D",
    fontSize: 12,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  confirmButton: {
    backgroundColor: "#FF768A",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 10,
  },
  notFoundText: {
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
    marginBottom: 20,
  },
  backButtonAlone: {
    backgroundColor: "#886BC1",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  backButtonAloneText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
