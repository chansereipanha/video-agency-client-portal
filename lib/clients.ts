export type Client = {
  id: string;
  name: string;
  initials: string;
  industry: string;
  contact: string;
  email: string;
  assets: number;
  colour: string;
  notes: string;
};
export type ResourceType =
  | "Edited video"
  | "Short-form video"
  | "Raw footage"
  | "Photo"
  | "Graphic"
  | "Document"
  | "Other";
export type Resource = {
  id: string;
  clientId: string;
  name: string;
  type: ResourceType;
  meta: string;
  icon: string;
  tone: "" | "blue" | "gold" | "green" | "pink" | "dark";
};
export const initialClients: Client[] = [
  {
    id: "harbour-and-co",
    name: "Harbour & Co.",
    initials: "H&",
    industry: "Hospitality",
    contact: "Tia Rangi",
    email: "tia@harbourandco.nz",
    assets: 7,
    colour: "#b7d9ff",
    notes: "Quarterly social campaign and hero brand film.",
  },
  {
    id: "koru-wellness",
    name: "Koru Wellness",
    initials: "K",
    industry: "Health & wellbeing",
    contact: "Aroha Te Rangi",
    email: "aroha@koruwellness.nz",
    assets: 5,
    colour: "#ffc9dc",
    notes: "Launch content for the new studio programme.",
  },
  {
    id: "rimu-collective",
    name: "Rimu Collective",
    initials: "R",
    industry: "Property",
    contact: "Finn McLeod",
    email: "finn@rimucollective.nz",
    assets: 6,
    colour: "#c9fa49",
    notes: "Monthly property walkthroughs and reels.",
  },
  {
    id: "pohutukawa-studio",
    name: "Pōhutukawa Studio",
    initials: "P",
    industry: "Retail",
    contact: "Mia Chen",
    email: "mia@pohutukawastudio.nz",
    assets: 3,
    colour: "#ffb184",
    notes: "Summer lookbook production.",
  },
  {
    id: "northland-escapes",
    name: "Northland Escapes",
    initials: "NE",
    industry: "Tourism",
    contact: "Jordan Blake",
    email: "jordan@northlandescapes.nz",
    assets: 4,
    colour: "#d8cbff",
    notes: "Destination video series.",
  },
];
export const initialResources: Resource[] = [
  {
    id: "h1",
    clientId: "harbour-and-co",
    name: "Harbour winter brand film.mp4",
    type: "Edited video",
    meta: "Video · 2:34",
    icon: "▶",
    tone: "",
  },
  {
    id: "h2",
    clientId: "harbour-and-co",
    name: "Winter menu teaser 9x16.mp4",
    type: "Short-form video",
    meta: "Video · 0:18",
    icon: "▶",
    tone: "blue",
  },
  {
    id: "h3",
    clientId: "harbour-and-co",
    name: "Kitchen shoot raw selects.mov",
    type: "Raw footage",
    meta: "Video · 14 clips",
    icon: "◉",
    tone: "dark",
  },
  {
    id: "h4",
    clientId: "harbour-and-co",
    name: "Campaign stills.zip",
    type: "Photo",
    meta: "Photos · 28 files",
    icon: "▧",
    tone: "gold",
  },
  {
    id: "h5",
    clientId: "harbour-and-co",
    name: "Social title cards.fig",
    type: "Graphic",
    meta: "Graphic · 6 layouts",
    icon: "✦",
    tone: "pink",
  },
  {
    id: "h6",
    clientId: "harbour-and-co",
    name: "Usage guide.pdf",
    type: "Document",
    meta: "Document · PDF",
    icon: "▤",
    tone: "green",
  },
  {
    id: "h7",
    clientId: "harbour-and-co",
    name: "Music licence.txt",
    type: "Other",
    meta: "Reference · Text",
    icon: "♪",
    tone: "blue",
  },
  {
    id: "k1",
    clientId: "koru-wellness",
    name: "Studio launch hero.mp4",
    type: "Edited video",
    meta: "Video · 1:42",
    icon: "▶",
    tone: "pink",
  },
  {
    id: "k2",
    clientId: "koru-wellness",
    name: "Breathwork reels.mp4",
    type: "Short-form video",
    meta: "Video · 4 clips",
    icon: "▶",
    tone: "green",
  },
  {
    id: "k3",
    clientId: "koru-wellness",
    name: "Instructor portraits.zip",
    type: "Photo",
    meta: "Photos · 16 files",
    icon: "▧",
    tone: "gold",
  },
  {
    id: "r1",
    clientId: "rimu-collective",
    name: "Showhome walkthrough.mp4",
    type: "Edited video",
    meta: "Video · 3:10",
    icon: "▶",
    tone: "blue",
  },
  {
    id: "r2",
    clientId: "rimu-collective",
    name: "Aerial raw footage.mov",
    type: "Raw footage",
    meta: "Video · 9 clips",
    icon: "◉",
    tone: "dark",
  },
];
