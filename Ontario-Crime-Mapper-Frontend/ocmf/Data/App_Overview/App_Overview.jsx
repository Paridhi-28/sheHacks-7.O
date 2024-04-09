import {
  faBell,
  faBook,
  faClock,
  faMagnifyingGlass,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Data = {
  featureList: [
    {
      Title: "Real-Time Crime Data",
      Icon: faClock,
      Animation: "spin",
      Description:
        "Stay updated with real-time crime data from your local area. Our app aggregates and analyzes information from reliable sources, providing you with the most accurate and current crime statistics available",
    },
    {
      Title: "Interactive Map with Custom Markers",
      Icon: faMapLocationDot,
      Animation: "spin",
      Description:
        "Visualize crime incidents with our interactive map. Our custom markers make it easy to identify different types of crimes at a glance, giving you a clear overview of the crime landscape in your vicinity.",
    },
    {
      Title: "Detailed Crime Information and Incident Reports",
      Icon: faBook,
      Animation: "beat",
      Description:
        "Dive deeper into each incident with detailed crime information and incident reports. Access comprehensive details such as date, time, location, and description, enabling you to gain valuable insights and make informed decisions.",
    },
    {
      Title: "User-Friendly Filtering and Search Options",
      Icon: faMagnifyingGlass,
      Animation: "spin",
      Description:
        "Filter and search through crime data effortlessly. Our app offers intuitive filtering options, allowing you to narrow down the results based on crime type, date, location, and other criteria. Find the information you need quickly and efficiently.",
    },
    {
      Title: "Personalized Notifications and Alerts",
      Icon: faBell,
      Animation: "beat",
      Description:
        "Stay proactive with personalized notifications and alerts. Customize your preferences to receive alerts about crimes in your chosen areas or specific types of incidents. Be informed and take necessary precautions to ensure your safety.",
    },
  ],
};

export default Data;