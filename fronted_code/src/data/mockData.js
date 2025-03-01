export const departments = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart and cardiovascular system specialists',
    icon: 'heart'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Brain and nervous system specialists',
    icon: 'brain'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Child healthcare specialists',
    icon: 'baby'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    description: 'Bone and joint specialists',
    icon: 'bone'
  }
];

export const doctors = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    department: 'cardiology',
    experience: 12,
    rating: 4.8,
    availability: ['Monday', 'Wednesday', 'Friday'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Johnson is a renowned cardiologist with expertise in preventive cardiology and heart disease management.'
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    department: 'neurology',
    experience: 15,
    rating: 4.9,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Chen specializes in neurological disorders and has pioneered several innovative treatment approaches.'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Martinez',
    specialization: 'Pediatrician',
    department: 'pediatrics',
    experience: 8,
    rating: 4.7,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Martinez is passionate about child healthcare and specializes in early childhood development.'
  }
];

export const medicines = [
  {
    id: 'm1',
    name: 'Cardiocare Plus',
    description: 'Heart health supplement with CoQ10',
    price: 29.99,
    inStock: true,
    category: 'Cardiac Care',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 'm2',
    name: 'NeuroVitamin B12',
    description: 'Essential B12 supplement for nerve health',
    price: 19.99,
    inStock: true,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

export const healthArticles = [
  {
    id: 'a1',
    title: 'Understanding Heart Health in Rural Communities',
    summary: 'Essential tips for maintaining cardiovascular health with limited access to healthcare facilities',
    content: 'Lorem ipsum...',
    category: 'Cardiac Health',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800&h=400',
    author: 'Dr. Sarah Johnson',
    date: '2024-03-15'
  },
  {
    id: 'a2',
    title: 'Nutrition Guide for Rural Families',
    summary: 'Making the most of locally available foods for a balanced diet',
    content: 'Lorem ipsum...',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800&h=400',
    author: 'Dr. Emily Martinez',
    date: '2024-03-10'
  }
];


// src/data/mockData.js

export const mockDoctor = {
  id: 'd1',
  fullName: "Dr. Emily Johnson",
  username: "dr.emily",
  email: "emily.johnson@example.com",
  mobile: "0987654321",
  licenseNumber: "MD123456789",
  specialty: "Cardiology",
  experience: 10,
  password: "doctorpassword", // This will be used for login
};

export const mockAppointments = [
  {
    id: 'a1',
    userId: 'u1',
    doctorId: 'd1',
    date: '2025-03-01',
    time: '10:00 AM',
    status: 'Pending', // Status can be 'Pending', 'Accepted', or 'Declined'
    userDetails: {
      fullName: "John Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      reason: "Routine check-up"
    }
  },
  {
    id: 'a2',
    userId: 'u2',
    doctorId: 'd1',
    date: '2025-03-02',
    time: '11:00 AM',
    status: 'Pending',
    userDetails: {
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      mobile: "0987654321",
      reason: "Consultation for chest pain"
    }
  },
  {
    id: 'a3',
    userId: 'u3',
    doctorId: 'd1',
    date: '2025-03-03',
    time: '09:00 AM',
    status: 'Accepted',
    userDetails: {
      fullName: "Alice Brown",
      email: "alicebrown@example.com",
      mobile: "1231231234",
      reason: "Follow-up visit"
    }
  }
];