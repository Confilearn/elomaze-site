/**
 * Nigerian geographical data for location-based features
 *
 * This file contains structured data for Nigerian states, cities,
 * and Local Government Areas (LGAs). This data powers:
 *
 * - Location search and autocomplete
 * - Property filtering by state/city/LGA
 * - Location-based dropdowns
 * - Geographic validation
 *
 * The data is structured to enable cascading selects:
 * State → Cities → LGAs
 */

/**
 * Interface defining the structure for Nigerian state data
 *
 * Each state contains major cities and all LGAs within that state.
 * This structure allows for hierarchical location selection.
 */
export interface NigeriaState {
  name: string;
  cities: string[]; // Major cities in the state
  lgas: string[]; // All Local Government Areas
}

/**
 * Complete list of Nigerian states with their cities and LGAs
 *
 * This is a curated selection of the most economically active
 * states and cities for real estate purposes. For a complete
 * list, you might want to import from an official government API.
 *
 * Data sources:
 * - Nigerian Postal Service (NIPOST)
 * - National Bureau of Statistics
 * - State government websites
 */
export const nigeriaStates: NigeriaState[] = [
  {
    name: "Lagos",
    cities: [
      "Lekki",
      "Ikeja",
      "Yaba",
      "Ajah",
      "Surulere",
      "Victoria Island",
      "Ikoyi",
      "Epe",
      "Badagry",
      "Apapa",
    ],
    lgas: [
      "Eti-Osa",
      "Ikeja",
      "Kosofe",
      "Alimosho",
      "Surulere",
      "Lagos Island",
      "Lagos Mainland",
      "Mushin",
      "Oshodi-Isolo",
      "Agege",
      "Amuwo-Odofin",
      "Ojo",
      "Badagry",
      "Ibeju-Lekki",
      "Epe",
      "Ikorodu",
      "Shomolu",
      "Ajeromi-Ifelodun",
      "Apapa",
      "Ifako-Ijaiye",
    ],
  },
  {
    name: "Abuja (FCT)",
    cities: [
      "Gwarinpa",
      "Maitama",
      "Wuse",
      "Garki",
      "Asokoro",
      "Jabi",
      "Lugbe",
      "Kubwa",
      "Karu",
      "Nyanya",
    ],
    lgas: [
      "Abaji",
      "Bwari",
      "Gwagwalada",
      "Kuje",
      "Kwali",
      "Municipal Area Council",
    ],
  },
  {
    name: "Rivers",
    cities: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Oyigbo"],
    lgas: [
      "Port Harcourt",
      "Obio-Akpor",
      "Eleme",
      "Ikwerre",
      "Oyigbo",
      "Ogu-Bolo",
      "Okrika",
      "Tai",
    ],
  },
  {
    name: "Edo",
    cities: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Igarra"],
    lgas: [
      "Oredo",
      "Egor",
      "Ikpoba-Okha",
      "Ovia North-East",
      "Ovia South-West",
      "Uhunmwonde",
      "Etsako West",
      "Esan Central",
    ],
  },
  {
    name: "Delta",
    cities: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
    lgas: [
      "Oshimili South",
      "Warri South",
      "Uvwie",
      "Sapele",
      "Ughelli North",
      "Ethiope East",
      "Ika South",
    ],
  },
  {
    name: "Enugu",
    cities: ["Enugu", "Nsukka", "Agbani", "Udi"],
    lgas: [
      "Enugu North",
      "Enugu South",
      "Enugu East",
      "Nsukka",
      "Udi",
      "Igbo-Etiti",
      "Nkanu West",
    ],
  },
  {
    name: "Anambra",
    cities: ["Awka", "Onitsha", "Nnewi", "Ekwulobia"],
    lgas: [
      "Awka South",
      "Onitsha South",
      "Nnewi North",
      "Aguata",
      "Idemili North",
      "Anaocha",
    ],
  },
  {
    name: "Oyo",
    cities: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"],
    lgas: [
      "Ibadan North",
      "Ibadan South-West",
      "Ibadan North-East",
      "Ibadan South-East",
      "Ogbomoso North",
      "Oyo East",
    ],
  },
  {
    name: "Ogun",
    cities: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota"],
    lgas: [
      "Abeokuta South",
      "Abeokuta North",
      "Ado-Odo/Ota",
      "Ijebu-Ode",
      "Sagamu",
      "Obafemi-Owode",
    ],
  },
  {
    name: "Kaduna",
    cities: ["Kaduna", "Zaria", "Kafanchan"],
    lgas: [
      "Kaduna North",
      "Kaduna South",
      "Chikun",
      "Zaria",
      "Igabi",
      "Jema'a",
    ],
  },
  {
    name: "Kano",
    cities: ["Kano", "Wudil", "Gwarzo"],
    lgas: [
      "Kano Municipal",
      "Nassarawa",
      "Fagge",
      "Dala",
      "Gwale",
      "Tarauni",
      "Ungogo",
    ],
  },
  {
    name: "Imo",
    cities: ["Owerri", "Orlu", "Okigwe"],
    lgas: ["Owerri Municipal", "Owerri North", "Owerri West", "Orlu", "Okigwe"],
  },
  {
    name: "Akwa Ibom",
    cities: ["Uyo", "Eket", "Ikot Ekpene"],
    lgas: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Itu"],
  },
  {
    name: "Abia",
    cities: ["Aba", "Umuahia", "Ohafia"],
    lgas: [
      "Aba North",
      "Aba South",
      "Umuahia North",
      "Umuahia South",
      "Ohafia",
    ],
  },
  {
    name: "Cross River",
    cities: ["Calabar", "Ogoja", "Ikom"],
    lgas: ["Calabar Municipal", "Calabar South", "Ogoja", "Ikom"],
  },
  {
    name: "Kwara",
    cities: ["Ilorin", "Offa", "Jebba"],
    lgas: ["Ilorin West", "Ilorin East", "Ilorin South", "Offa", "Oyun"],
  },
  {
    name: "Osun",
    cities: ["Osogbo", "Ile-Ife", "Ilesa"],
    lgas: ["Osogbo", "Ife Central", "Ilesa West", "Ede North"],
  },
  {
    name: "Ondo",
    cities: ["Akure", "Ondo", "Owo"],
    lgas: ["Akure South", "Akure North", "Ondo West", "Owo"],
  },
  {
    name: "Ekiti",
    cities: ["Ado-Ekiti", "Ikere", "Ijero"],
    lgas: ["Ado-Ekiti", "Ikere", "Ijero", "Efon"],
  },
  {
    name: "Plateau",
    cities: ["Jos", "Bukuru", "Barkin Ladi"],
    lgas: ["Jos North", "Jos South", "Barkin Ladi", "Bassa"],
  },
];

/**
 * Helper array containing just the state names
 * Useful for simple state dropdowns where cities/LGAs aren't needed
 */
export const allStates = nigeriaStates.map((s) => s.name);

/**
 * Get all cities for a specific Nigerian state
 *
 * @param stateName - The name of the state (e.g., "Lagos", "Abuja (FCT)")
 * @returns Array of city names for the state, or empty array if state not found
 *
 * @example
 * getCitiesForState("Lagos") // Returns ["Lekki", "Ikeja", "Yaba", ...]
 */
export function getCitiesForState(stateName: string): string[] {
  return nigeriaStates.find((s) => s.name === stateName)?.cities || [];
}

/**
 * Get all LGAs for a specific Nigerian state
 *
 * @param stateName - The name of the state
 * @returns Array of LGA names for the state, or empty array if state not found
 *
 * @example
 * getLGAsForState("Lagos") // Returns ["Eti-Osa", "Ikeja", "Kosofe", ...]
 */
export function getLGAsForState(stateName: string): string[] {
  return nigeriaStates.find((s) => s.name === stateName)?.lgas || [];
}
