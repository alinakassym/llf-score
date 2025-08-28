// shared/mocks/transferRows.ts
export type TransferRow = {
  player: string;
  team: string;
  position: string;
  status: string;
  cost: string;
  salary: string;
  image?: any;
};

export const transferRows: TransferRow[] = [
  {
    player: "Lionel Messi",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "100",
    salary: "50.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Cristiano Ronaldo",
    team: "Al-Nassr",
    position: "Forward",
    status: "✔",
    cost: "120",
    salary: "55.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Neymar Jr.",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "110",
    salary: "48.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    status: "✔",
    cost: "90",
    salary: "45.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Robert Lewandowski",
    team: "Barcelona",
    position: "Forward",
    status: "✔",
    cost: "95",
    salary: "47.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Kylian Mbappé",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "130",
    salary: "60.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    status: "✔",
    cost: "125",
    salary: "58.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    status: "✔",
    cost: "115",
    salary: "52.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Virgil van Dijk",
    team: "Liverpool",
    position: "Defender",
    status: "✔",
    cost: "85",
    salary: "40.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Luka Modrić",
    team: "Real Madrid",
    position: "Midfielder",
    status: "✔",
    cost: "80",
    salary: "42.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Karim Benzema",
    team: "Al-Ittihad",
    position: "Forward",
    status: "✔",
    cost: "105",
    salary: "50.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Pedri",
    team: "Barcelona",
    position: "Midfielder",
    status: "✔",
    cost: "75",
    salary: "38.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
];
