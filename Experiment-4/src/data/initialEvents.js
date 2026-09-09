// Seed events for the calendar.
// category drives the accent color used on the EventCard (see App.css).
export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CATEGORIES = ["Work", "Personal", "Health"];

export const initialEvents = [
  {
    id: "evt-1",
    title: "Sprint planning",
    day: "Monday",
    time: "09:30",
    category: "Work",
    completed: false,
  },
  {
    id: "evt-2",
    title: "Design review",
    day: "Monday",
    time: "14:00",
    category: "Work",
    completed: false,
  },
  {
    id: "evt-3",
    title: "Morning run",
    day: "Tuesday",
    time: "07:00",
    category: "Health",
    completed: false,
  },
  {
    id: "evt-4",
    title: "Dentist appointment",
    day: "Wednesday",
    time: "11:15",
    category: "Health",
    completed: false,
  },
  {
    id: "evt-5",
    title: "Dinner with family",
    day: "Friday",
    time: "19:30",
    category: "Personal",
    completed: false,
  },
  {
    id: "evt-6",
    title: "Read for an hour",
    day: "Sunday",
    time: "20:00",
    category: "Personal",
    completed: false,
  },
];
