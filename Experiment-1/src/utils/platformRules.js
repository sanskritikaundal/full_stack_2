import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export const PLATFORMS = [
  {
    id: "twitter",
    label: "Twitter / X",
    short: "X",
    icon: Twitter,
    maxChars: 280,
    placeholder: "What's happening?",
    ink: "#1C4E72",
    seal: "#2E6E9E",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    short: "In",
    icon: Linkedin,
    maxChars: 3000,
    placeholder: "Share your professional thoughts...",
    ink: "#1B4A3F",
    seal: "#2F6E5B",
  },
  {
    id: "facebook",
    label: "Facebook",
    short: "Fb",
    icon: Facebook,
    maxChars: 63206,
    placeholder: "What's on your mind?",
    ink: "#1C3D66",
    seal: "#2E5A94",
  },
  {
    id: "instagram",
    label: "Instagram",
    short: "Ig",
    icon: Instagram,
    maxChars: 2200,
    placeholder: "Write a caption...",
    ink: "#6E2A4A",
    seal: "#A13D69",
  },
];
