export type Client={id:string;name:string;initials:string;industry:string;contact:string;email:string;assets:number;colour:string;notes:string};
export const clients:Client[]=[
  {id:"harbour-and-co",name:"Harbour & Co.",initials:"H&",industry:"Hospitality",contact:"Tia Rangi",email:"tia@harbourandco.nz",assets:12,colour:"#b7d9ff",notes:"Quarterly social campaign and hero brand film."},
  {id:"koru-wellness",name:"Koru Wellness",initials:"K",industry:"Health & wellbeing",contact:"Aroha Te Rangi",email:"aroha@koruwellness.nz",assets:8,colour:"#ffc9dc",notes:"Launch content for the new studio programme."},
  {id:"rimu-collective",name:"Rimu Collective",initials:"R",industry:"Property",contact:"Finn McLeod",email:"finn@rimucollective.nz",assets:21,colour:"#c9fa49",notes:"Monthly property walkthroughs and reels."},
  {id:"pohutukawa-studio",name:"Pōhutukawa Studio",initials:"P",industry:"Retail",contact:"Mia Chen",email:"mia@pohutukawastudio.nz",assets:6,colour:"#ffb184",notes:"Summer lookbook production."},
  {id:"northland-escapes",name:"Northland Escapes",initials:"NE",industry:"Tourism",contact:"Jordan Blake",email:"jordan@northlandescapes.nz",assets:17,colour:"#d8cbff",notes:"Destination video series."},
];
export const resources=[["Brand film — first cut.mp4","Video • 2:34","▶"],["Behind the scenes selects.mp4","Video • 0:46","▶"],["Campaign stills.zip","Photos • 28 files","▧"]] as const;
