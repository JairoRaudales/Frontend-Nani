import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { ArrowLeft, Calendar, Check, Clock } from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface AvailabilityDay {
  day: string;
  selected: boolean;
  startTime: string;
  endTime: string;
}

export default function BabysitterAvailabilitySetup() {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([
    { day: "Lunes", selected: false, startTime: "08:00", endTime: "18:00" },
    { day: "Martes", selected: false, startTime: "08:00", endTime: "18:00" },
    { day: "Miércoles", selected: false, startTime: "08:00", endTime: "18:00" },
    { day: "Jueves", selected: false, startTime: "08:00", endTime: "18:00" },
    { day: "Viernes", selected: false, startTime: "08:00", endTime: "18:00" },
    { day: "Sábado", selected: false, startTime: "09:00", endTime: "14:00" },
    { day: "Domingo", selected: false, startTime: "09:00", endTime: "14:00" },
  ]);

  const toggleDay = (index: number) => {
    const newAvailability = [...availability];
    newAvailability[index].selected = !newAvailability[index].selected;
    setAvailability(newAvailability);
  };

  const updateTime = (
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const selectedDays = availability.filter((d) => d.selected).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="white" size={20} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Configura tu disponibilidad</Text>
        </View>

        <Text style={styles.headerSubtitle}>
          Selecciona los días que estás disponible y tus horarios de trabajo
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Calendar color="#886BC1" size={18} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Agrega tus días disponibles</Text>

            <Text style={styles.infoText}>
              Selecciona cada día de la semana en el que puedes trabajar y
              configura tus horarios.
            </Text>
          </View>
        </View>

        {/* Days */}
        {availability.map((dayData, index) => (
          <View
            key={dayData.day}
            style={[styles.dayCard, dayData.selected && styles.dayCardActive]}
          >
            <View style={styles.dayHeader}>
              <View style={styles.dayLeft}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    dayData.selected && styles.checkboxActive,
                  ]}
                  onPress={() => toggleDay(index)}
                >
                  {dayData.selected && <Check color="white" size={14} />}
                </TouchableOpacity>

                <Text style={styles.dayText}>{dayData.day}</Text>
              </View>

              {dayData.selected && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Activo</Text>
                </View>
              )}
            </View>

            {dayData.selected && (
              <View style={styles.timeContainer}>
                <Text style={styles.label}>
                  <Clock size={12} /> Hora de inicio
                </Text>

                <Picker
                  selectedValue={dayData.startTime}
                  onValueChange={(value) =>
                    updateTime(index, "startTime", value)
                  }
                >
                  {timeOptions.map((time) => (
                    <Picker.Item key={time} label={time} value={time} />
                  ))}
                </Picker>

                <Text style={styles.label}>
                  <Clock size={12} /> Hora de finalización
                </Text>

                <Picker
                  selectedValue={dayData.endTime}
                  onValueChange={(value) => updateTime(index, "endTime", value)}
                >
                  {timeOptions.map((time) => (
                    <Picker.Item key={time} label={time} value={time} />
                  ))}
                </Picker>

                <View style={styles.timePreview}>
                  <Text style={styles.timePreviewText}>
                    {dayData.startTime} - {dayData.endTime}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumen de disponibilidad</Text>

          <Text style={styles.summaryText}>
            Días seleccionados: {selectedDays} de 7
          </Text>

          {selectedDays > 0 ? (
            <View style={styles.summaryDays}>
              {availability
                .filter((d) => d.selected)
                .map((day) => (
                  <View key={day.day} style={styles.summaryBadge}>
                    <Text style={styles.summaryBadgeText}>{day.day}</Text>
                  </View>
                ))}
            </View>
          ) : (
            <Text style={styles.summaryEmpty}>
              Selecciona al menos un día para continuar
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottom}>
        <TouchableOpacity
          disabled={selectedDays === 0}
          style={[
            styles.continueButton,
            selectedDays === 0 && styles.continueDisabled,
          ]}
          onPress={() => router.push("./BabysitterDashboard")}
        >
          <Check color="white" size={20} />
          <Text style={styles.continueText}>Aceptar y continuar</Text>
        </TouchableOpacity>

        <View style={styles.progress}>
          <View style={styles.dotActive} />
          <View style={styles.dotActive} />
        </View>

        <Text style={styles.progressText}>Paso 2 de 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    backgroundColor: "#886BC1",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },

  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: 10,
  },

  headerTitle: { color: "white", fontSize: 18, fontWeight: "600" },

  headerSubtitle: { color: "rgba(255,255,255,0.9)" },

  content: { padding: 20 },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F6D9F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  infoTitle: { fontWeight: "600", marginBottom: 3 },

  infoText: { fontSize: 13, color: "#666" },

  dayCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  dayCardActive: { borderWidth: 2, borderColor: "#FF768A" },

  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dayLeft: { flexDirection: "row", alignItems: "center" },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  checkboxActive: { backgroundColor: "#FF768A", borderColor: "#FF768A" },

  dayText: { fontSize: 16 },

  activeBadge: {
    backgroundColor: "#F6D9F1",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  activeBadgeText: { color: "#886BC1", fontSize: 12 },

  timeContainer: { marginTop: 15 },

  label: { fontSize: 12, color: "#666", marginBottom: 5 },

  timePreview: {
    marginTop: 10,
    backgroundColor: "#F6D9F1",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  timePreviewText: { color: "#886BC1", fontWeight: "500" },

  summary: {
    backgroundColor: "#886BC1",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },

  summaryTitle: { color: "white", fontWeight: "600", marginBottom: 5 },

  summaryText: { color: "white" },

  summaryDays: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },

  summaryBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },

  summaryBadgeText: { color: "white", fontSize: 12 },

  summaryEmpty: { color: "rgba(255,255,255,0.7)", marginTop: 6 },

  bottom: {
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  continueButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF768A",
    padding: 16,
    borderRadius: 16,
  },

  continueDisabled: { backgroundColor: "#ccc" },

  continueText: { color: "white", marginLeft: 8, fontWeight: "600" },

  progress: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF768A",
    marginHorizontal: 4,
  },

  progressText: { textAlign: "center", marginTop: 5, color: "#888" },
});
