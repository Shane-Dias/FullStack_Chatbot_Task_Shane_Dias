export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface CourseItem {
  id: string;
  title: string;
  level: "Beginner" | "Advanced" | "Certification";
  duration: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "aerial-survey",
    title: "Aerial Survey & Mapping",
    description: "High-precision drone surveying for land, construction, and infrastructure projects.",
    icon: "Map",
  },
  {
    id: "agri-drone",
    title: "Agricultural Spraying",
    description: "Crop health monitoring and precision spraying using specialized agri-drones.",
    icon: "Sprout",
  },
  {
    id: "inspection",
    title: "Industrial Inspection",
    description: "Safe, efficient inspection of towers, pipelines, solar farms, and rooftops.",
    icon: "ScanEye",
  },
  {
    id: "cinematography",
    title: "Aerial Cinematography",
    description: "Cinematic aerial footage for films, events, real estate, and marketing.",
    icon: "Clapperboard",
  },
  {
    id: "custom-build",
    title: "Custom Drone Solutions",
    description: "Bespoke drone design, assembly, and payload integration for unique use cases.",
    icon: "Cpu",
  },
  {
    id: "consulting",
    title: "Drone Consulting",
    description: "Regulatory guidance, fleet planning, and operational strategy for organizations.",
    icon: "ClipboardList",
  },
];

export const COURSES: CourseItem[] = [
  {
    id: "beginner-pilot",
    title: "Beginner Drone Piloting",
    level: "Beginner",
    duration: "2 weeks",
    description: "Learn the fundamentals of flight, safety, and basic maneuvers.",
  },
  {
    id: "certified-pilot",
    title: "Drone Pilot Certification Course",
    level: "Certification",
    duration: "4 weeks",
    description: "Government-aligned certification preparing you for commercial drone operations.",
  },
  {
    id: "advanced-mapping",
    title: "Advanced Aerial Mapping & GIS",
    level: "Advanced",
    duration: "3 weeks",
    description: "Deep-dive into photogrammetry, GIS integration, and survey-grade data capture.",
  },
  {
    id: "drone-building",
    title: "Drone Assembly & Maintenance",
    level: "Advanced",
    duration: "3 weeks",
    description: "Hands-on training in building, repairing, and maintaining multirotor drones.",
  },
];
