import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  MapPin,
  Shield,
  Star,
} from "lucide-react-native";

interface Props {
  onEditProfile: () => void;
  onEditAvailability: () => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function BabysitterOwnProfile({
  onEditProfile,
  onEditAvailability,
  onBack,
}: Props) {
  const [activeTab, setActiveTab] = useState<"profile" | "bookings">("profile");

  const profile = {
    name: "María González",
    photo: "https://images.unsplash.com/photo-1584446456661-1039ed1a39d7?w=800",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 15,
    experience: "5 años",
    location: "Centro, Ciudad",
    about:
      "Soy una niñera profesional con amplia experiencia en el cuidado de niños de todas las edades.",
    skills: [
      "Primeros auxilios",
      "Educación infantil",
      "Cocina saludable",
      "Bilingüe",
    ],
    certifications: [
      "Certificada en RCP",
      "Curso de primeros auxilios",
      "Pedagogía infantil",
    ],
    totalEarnings: 2450,
    completedBookings: 87,
  };

  const availability = [
    { day: "Lunes - Viernes", hours: "8:00 AM - 6:00 PM", available: true },
    { day: "Sábados", hours: "9:00 AM - 2:00 PM", available: true },
    { day: "Domingos", hours: "No disponible", available: false },
  ];

  const upcomingBookings = [
    {
      id: 1,
      clientName: "Laura Pérez",
      clientPhoto:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      date: "Sábado, 15 Feb",
      time: "2:00 PM - 6:00 PM",
      children: 2,
      payment: 60,
      status: "confirmed",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER IMAGE */}

      <View style={styles.headerContainer}>
        <Image source={{ uri: profile.photo }} style={styles.headerImage} />

        <View style={styles.headerButtons}>
          <Pressable style={styles.backBtn} onPress={onBack}>
            <ArrowLeft size={20} color="#2E2E2E" />
          </Pressable>

          <Pressable style={styles.editBtn} onPress={onEditProfile}>
            <Edit size={16} color="#886BC1" />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
        </View>
      </View>

      {/* PROFILE CARD */}

      <View style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View>
            <Text style={styles.name}>{profile.name}</Text>

            <View style={styles.row}>
              <Star size={14} color="#FF768A" />
              <Text style={styles.rating}>{profile.rating}</Text>
              <Text style={styles.reviews}>({profile.reviews} reseñas)</Text>
            </View>

            <View style={styles.row}>
              <MapPin size={14} color="#888" />
              <Text style={styles.location}>{profile.location}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.price}>${profile.hourlyRate}</Text>
            <Text style={styles.priceLabel}>por hora</Text>
          </View>
        </View>

        <View style={styles.badges}>
          <View style={styles.badge}>
            <Shield size={14} color="#886BC1" />
            <Text>Verificada</Text>
          </View>

          <View style={styles.badge}>
            <Award size={14} color="#886BC1" />
            <Text>{profile.experience}</Text>
          </View>
        </View>
      </View>

      {/* STATS */}

      <View style={styles.statsRow}>
        <View style={styles.statCardPurple}>
          <Text style={styles.statValue}>${profile.totalEarnings}</Text>
          <Text style={styles.statLabel}>Ganado este mes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValuePurple}>
            {profile.completedBookings}
          </Text>
          <Text style={styles.statLabel}>Reservas completadas</Text>
        </View>
      </View>

      {/* TABS */}

      <View style={styles.tabs}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "profile" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("profile")}
        >
          <Text
            style={
              activeTab === "profile" ? styles.tabTextActive : styles.tabText
            }
          >
            Mi Perfil
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === "bookings" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("bookings")}
        >
          <Text
            style={
              activeTab === "bookings" ? styles.tabTextActive : styles.tabText
            }
          >
            Reservas
          </Text>
        </Pressable>
      </View>

      {/* PROFILE TAB */}

      {activeTab === "profile" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presentación</Text>
          <Text style={styles.about}>{profile.about}</Text>

          <Text style={styles.sectionTitle}>Habilidades</Text>

          <View style={styles.skillWrap}>
            {profile.skills.map((skill) => (
              <View key={skill} style={styles.skill}>
                <Text>{skill}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Certificaciones</Text>

          {profile.certifications.map((cert) => (
            <View key={cert} style={styles.certRow}>
              <CheckCircle size={16} color="#FF768A" />
              <Text>{cert}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Disponibilidad</Text>

          {availability.map((slot, i) => (
            <View key={i} style={styles.availabilityRow}>
              <Text>{slot.day}</Text>
              <Text style={{ color: slot.available ? "#886BC1" : "#999" }}>
                {slot.hours}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* BOOKINGS TAB */}

      {activeTab === "bookings" && (
        <View style={styles.section}>
          {upcomingBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Image
                source={{ uri: booking.clientPhoto }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.clientName}>{booking.clientName}</Text>

                <View style={styles.row}>
                  <Calendar size={14} />
                  <Text>{booking.date}</Text>
                </View>

                <View style={styles.row}>
                  <Clock size={14} />
                  <Text>{booking.time}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.payment}>${booking.payment}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  headerContainer: {
    height: 240,
  },

  headerImage: {
    width: "100%",
    height: "100%",
  },

  headerButtons: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  backBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },

  editText: {
    fontSize: 12,
  },

  profileCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  profileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 20,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  rating: {
    marginLeft: 4,
  },

  reviews: {
    color: "#888",
  },

  location: {
    color: "#777",
  },

  price: {
    color: "#886BC1",
    fontSize: 22,
  },

  priceLabel: {
    color: "#888",
  },

  badges: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F6D9F1",
    padding: 6,
    borderRadius: 20,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },

  statCardPurple: {
    flex: 1,
    backgroundColor: "#886BC1",
    padding: 20,
    borderRadius: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },

  statValue: {
    fontSize: 22,
    color: "white",
  },

  statValuePurple: {
    fontSize: 22,
    color: "#886BC1",
  },

  statLabel: {
    fontSize: 12,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 5,
  },

  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#FF768A",
    borderRadius: 15,
  },

  tabText: {
    color: "#666",
  },

  tabTextActive: {
    color: "white",
  },

  section: {
    paddingHorizontal: 20,
    gap: 15,
  },

  sectionTitle: {
    fontSize: 16,
  },

  about: {
    color: "#666",
  },

  skillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  skill: {
    backgroundColor: "#F6D9F1",
    padding: 8,
    borderRadius: 20,
  },

  certRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  bookingCard: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  clientName: {
    fontSize: 16,
  },

  payment: {
    color: "#886BC1",
    fontSize: 16,
  },
});
