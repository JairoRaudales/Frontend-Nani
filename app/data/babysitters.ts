export type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

export type AvailabilitySlot = {
  label: string;
  time: string;
  available: boolean;
};

export type ReservedDate = {
  id: number;
  day: string;
  time: string;
  status: string;
};

export type Babysitter = {
  id: number;
  name: string;
  photo: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: string;
  location: string;
  about: string;
  verified: boolean;
  skills: string[];
  certifications: string[];
  availability: AvailabilitySlot[];
  reservedDates: ReservedDate[];
  reviewsList: Review[];
  isOnline: boolean;
  isAvailable: boolean;
  certified: boolean;
  distanceKm: number;
};

export const babysittersData: Babysitter[] = [
  {
    id: 1,
    name: "María González",
    photo:
      "https://images.unsplash.com/photo-1584446456661-1039ed1a39d7?w=800&h=800&fit=crop",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 15,
    experience: "5 años",
    location: "Centro, Ciudad",
    about:
      "Soy una niñera profesional con amplia experiencia en el cuidado de niños de todas las edades. Me encanta crear un ambiente seguro y divertido para los pequeños.",
    verified: true,
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
    availability: [
      {
        label: "Lunes - Viernes",
        time: "8:00 AM - 6:00 PM",
        available: true,
      },
      { label: "Sábados", time: "9:00 AM - 2:00 PM", available: true },
      { label: "Domingos", time: "No disponible", available: false },
    ],
    reservedDates: [
      {
        id: 1,
        day: "Sábado, 15 Feb",
        time: "2:00 PM - 6:00 PM",
        status: "Reservado",
      },
      {
        id: 2,
        day: "Miércoles, 19 Feb",
        time: "3:00 PM - 7:00 PM",
        status: "Reservado",
      },
      {
        id: 3,
        day: "Viernes, 21 Feb",
        time: "10:00 AM - 2:00 PM",
        status: "Reservado",
      },
    ],
    reviewsList: [
      {
        id: 1,
        name: "Laura Pérez",
        rating: 5,
        date: "Hace 2 días",
        comment:
          "Excelente profesional, mis hijos la adoran. Muy responsable y puntual.",
      },
      {
        id: 2,
        name: "Carlos Mendoza",
        rating: 5,
        date: "Hace 1 semana",
        comment: "María es increíble con los niños. Totalmente recomendada.",
      },
      {
        id: 3,
        name: "Ana Torres",
        rating: 4,
        date: "Hace 2 semanas",
        comment:
          "Muy buena experiencia, siempre mantiene informados a los padres.",
      },
    ],
    isOnline: true,
    isAvailable: true,
    certified: true,
    distanceKm: 2,
  },
  {
    id: 2,
    name: "Ana Rodríguez",
    photo:
      "https://images.unsplash.com/photo-1565310561974-f2dc282230d9?w=800&h=800&fit=crop",
    rating: 4.8,
    reviews: 98,
    hourlyRate: 18,
    experience: "3 años",
    location: "Norte, Ciudad",
    about:
      "Me especializo en el cuidado respetuoso y responsable de niños pequeños. Soy muy paciente y organizada, y me gusta mantener una comunicación constante con los padres.",
    verified: true,
    skills: [
      "Estimulación temprana",
      "Organización",
      "Apoyo escolar",
      "Manualidades",
    ],
    certifications: [
      "Curso de cuidado infantil",
      "Certificación en primeros auxilios",
    ],
    availability: [
      {
        label: "Lunes - Viernes",
        time: "7:00 AM - 5:00 PM",
        available: true,
      },
      { label: "Sábados", time: "8:00 AM - 1:00 PM", available: true },
      { label: "Domingos", time: "No disponible", available: false },
    ],
    reservedDates: [
      {
        id: 1,
        day: "Martes, 18 Feb",
        time: "1:00 PM - 5:00 PM",
        status: "Reservado",
      },
      {
        id: 2,
        day: "Jueves, 20 Feb",
        time: "9:00 AM - 12:00 PM",
        status: "Reservado",
      },
    ],
    reviewsList: [
      {
        id: 1,
        name: "Marcos López",
        rating: 5,
        date: "Hace 3 días",
        comment: "Muy amable y puntual. Excelente trato con mi hija.",
      },
      {
        id: 2,
        name: "Daniela Cruz",
        rating: 4,
        date: "Hace 6 días",
        comment: "Muy buena niñera, bastante responsable.",
      },
    ],
    isOnline: true,
    isAvailable: true,
    certified: false,
    distanceKm: 4,
  },
  {
    id: 3,
    name: "Sofía Martínez",
    photo:
      "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?w=800&h=800&fit=crop",
    rating: 5.0,
    reviews: 152,
    hourlyRate: 20,
    experience: "7 años",
    location: "Sur, Ciudad",
    about:
      "Tengo amplia experiencia cuidando niños de distintas edades. Me enfoco en seguridad, actividades educativas y acompañamiento afectivo.",
    verified: true,
    skills: [
      "Primeros auxilios",
      "Apoyo educativo",
      "Cocina infantil",
      "Bilingüe",
    ],
    certifications: [
      "RCP pediátrico",
      "Curso avanzado de primeros auxilios",
      "Diplomado en atención infantil",
    ],
    availability: [
      {
        label: "Lunes - Viernes",
        time: "10:00 AM - 7:00 PM",
        available: true,
      },
      { label: "Sábados", time: "Disponible", available: true },
      { label: "Domingos", time: "Disponible con reserva", available: true },
    ],
    reservedDates: [
      {
        id: 1,
        day: "Lunes, 17 Feb",
        time: "4:00 PM - 8:00 PM",
        status: "Reservado",
      },
    ],
    reviewsList: [
      {
        id: 1,
        name: "Paola Gómez",
        rating: 5,
        date: "Hace 1 día",
        comment: "La mejor experiencia que hemos tenido. Muy recomendada.",
      },
      {
        id: 2,
        name: "José Valladares",
        rating: 5,
        date: "Hace 5 días",
        comment: "Excelente profesionalismo y mucha paciencia.",
      },
    ],
    isOnline: false,
    isAvailable: true,
    certified: true,
    distanceKm: 6,
  },
  {
    id: 4,
    name: "Laura Pérez",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    rating: 4.7,
    reviews: 85,
    hourlyRate: 14,
    experience: "2 años",
    location: "Este, Ciudad",
    about:
      "Soy una niñera responsable, cariñosa y organizada. Me gusta acompañar a los niños en actividades recreativas y educativas.",
    verified: true,
    skills: [
      "Cuidado infantil",
      "Apoyo escolar",
      "Juegos didácticos",
      "Paciencia",
    ],
    certifications: [
      "Curso básico de primeros auxilios",
      "Taller de atención infantil",
    ],
    availability: [
      {
        label: "Lunes - Viernes",
        time: "9:00 AM - 5:00 PM",
        available: true,
      },
      { label: "Sábados", time: "Disponible con cita", available: true },
      { label: "Domingos", time: "No disponible", available: false },
    ],
    reservedDates: [
      {
        id: 1,
        day: "Jueves, 20 Feb",
        time: "2:00 PM - 5:00 PM",
        status: "Reservado",
      },
    ],
    reviewsList: [
      {
        id: 1,
        name: "Valeria Ramos",
        rating: 5,
        date: "Hace 4 días",
        comment: "Muy dedicada y amable con mis hijos.",
      },
      {
        id: 2,
        name: "Mario Flores",
        rating: 4,
        date: "Hace 1 semana",
        comment: "Buena experiencia, muy responsable.",
      },
    ],
    isOnline: true,
    isAvailable: false,
    certified: true,
    distanceKm: 1.5,
  },
];
