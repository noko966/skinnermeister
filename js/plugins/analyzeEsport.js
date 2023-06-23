const fs = require("fs");
const { getLuminance, lighten, darken, rgba } = require("polished");
const postcss = require("postcss");

const cmsColors = [
  {
    id: 1,
    Brand: "#F14100",
    Accent: "#FFB700",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 5,
    Brand: "#7ED64C",
    Accent: "#7ED64C",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 9,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 11,
    Brand: "#F0841F",
    Accent: "#F0841F",
    Background: "#1E2128",
    Foreground: "#FFFFFF",
  },
  {
    id: 12,
    Brand: "#347131",
    Accent: "#347131",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 13,
    Brand: "#00544C",
    Accent: "#00544C",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 14,
    Brand: "#449539",
    Accent: "#449539",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 16,
    Brand: "#E50CD3",
    Accent: "#E50CD3",
    Background: "#CCCCCC",
    Foreground: "#000000",
  },
  {
    id: 23,
    Brand: "#EB3944",
    Accent: "#EB3944",
    Background: "#1A232C",
    Foreground: "#FFFFFF",
  },
  {
    id: 24,
    Brand: "#157A5A",
    Accent: "#157A5A",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 25,
    Brand: "#EB3944",
    Accent: "#EB3944",
    Background: "#FFFFFF",
    Foreground: "#1A232E",
  },
  {
    id: 29,
    Brand: "#FFDA00",
    Accent: "#FFDA00",
    Background: "#1C2025",
    Foreground: "#FFFFFF",
  },
  {
    id: 30,
    Brand: "#2A7394",
    Accent: "#2A7394",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 31,
    Brand: "#CF0102",
    Accent: "#CF0102",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 32,
    Brand: "#CF0102",
    Accent: "#CF0102",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 33,
    Brand: "#BF0601",
    Accent: "#BF0601",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 34,
    Brand: "#52A203",
    Accent: "#52A203",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 35,
    Brand: "#7ED64C",
    Accent: "#7ED64C",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 39,
    Brand: "#008EB0",
    Accent: "#008EB0",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 40,
    Brand: "#00E777",
    Accent: "#00E777",
    Background: "#070D13",
    Foreground: "#FFFFFF",
  },
  {
    id: 41,
    Brand: "#30852F",
    Accent: "#30852F",
    Background: "#212121",
    Foreground: "#FFFFFF",
  },
  {
    id: 42,
    Brand: "#247423",
    Accent: "#247423",
    Background: "#E8E8E8",
    Foreground: "#000000",
  },
  {
    id: 43,
    Brand: "#4083C9",
    Accent: "#4083C9",
    Background: "#090C11",
    Foreground: "#FFFFFF",
  },
  {
    id: 44,
    Brand: "#F8B80E",
    Accent: "#F8B80E",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 45,
    Brand: "#FCDF50",
    Accent: "#FCDF50",
    Background: "#333333",
    Foreground: "#FFFFFF",
  },
  {
    id: 46,
    Brand: "#FFB600",
    Accent: "#FFB600",
    Background: "#C2C2C2",
    Foreground: "#000000",
  },
  {
    id: 47,
    Brand: "#2A7394",
    Accent: "#2A7394",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 53,
    Brand: "#FEC310",
    Accent: "#FEC310",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 54,
    Brand: "#61BC47",
    Accent: "#61BC47",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 55,
    Brand: "#7ED64C",
    Accent: "#7ED64C",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 58,
    Brand: "#0E86C8",
    Accent: "#0E86C8",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 60,
    Brand: "#F14100",
    Accent: "#F14100",
    Background: "#06101C",
    Foreground: "#FFFFFF",
  },
  {
    id: 62,
    Brand: "#7ED64C",
    Accent: "#7ED64C",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 63,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 64,
    Brand: "#FFB701",
    Accent: "#FFB701",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 65,
    Brand: "#24BA9D",
    Accent: "#24BA9D",
    Background: "#232121",
    Foreground: "#FFFFFF",
  },
  {
    id: 66,
    Brand: "#44D183",
    Accent: "#44D183",
    Background: "#F5F5F5",
    Foreground: "#000000",
  },
  {
    id: 67,
    Brand: "#EDDDA8",
    Accent: "#EDDDA8",
    Background: "#25292C",
    Foreground: "#FFFFFF",
  },
  {
    id: 69,
    Brand: "#F9DC17",
    Accent: "#F9DC17",
    Background: "#0C0F2B",
    Foreground: "#FFFFFF",
  },
  {
    id: 70,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#00021B",
    Foreground: "#FFFFFF",
  },
  {
    id: 71,
    Brand: "#14805E",
    Accent: "#14805E",
    Background: "#E8E8E8",
    Foreground: "#000000",
  },
  {
    id: 72,
    Brand: "#7DA92E",
    Accent: "#7DA92E",
    Background: "#E0E0E0",
    Foreground: "#000000",
  },
  {
    id: 75,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 76,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 78,
    Brand: "#FDDA06",
    Accent: "#FDDA06",
    Background: "#333333",
    Foreground: "#FFFFFF",
  },
  {
    id: 79,
    Brand: "#F8E800",
    Accent: "#F8E800",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 80,
    Brand: "#FFB900",
    Accent: "#FFB900",
    Background: "#181510",
    Foreground: "#FFFFFF",
  },
  {
    id: 81,
    Brand: "#EAD522",
    Accent: "#EAD522",
    Background: "#161F26",
    Foreground: "#FFFFFF",
  },
  {
    id: 83,
    Brand: "#00093A",
    Accent: "#00093A",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 85,
    Brand: "#44D183",
    Accent: "#44D183",
    Background: "#F5F5F5",
    Foreground: "#000000",
  },
  {
    id: 86,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 87,
    Brand: "#070750",
    Accent: "#070750",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 88,
    Brand: "#CF0102",
    Accent: "#CF0102",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 89,
    Brand: "#E0BE00",
    Accent: "#E0BE00",
    Background: "#161823",
    Foreground: "#FFFFFF",
  },
  {
    id: 90,
    Brand: "#FFD54F",
    Accent: "#FFD54F",
    Background: "#292A47",
    Foreground: "#FFFFFF",
  },
  {
    id: 91,
    Brand: "#FEE71F",
    Accent: "#FEE71F",
    Background: "#0E2034",
    Foreground: "#FFFFFF",
  },
  {
    id: 92,
    Brand: "#951C69",
    Accent: "#951C69",
    Background: "#333333",
    Foreground: "#FFFFFF",
  },
  {
    id: 94,
    Brand: "#FFAC2E",
    Accent: "#FFAC2E",
    Background: "#1E273E",
    Foreground: "#FFFFFF",
  },
  {
    id: 95,
    Brand: "#013608",
    Accent: "#013608",
    Background: "#F2F2F2",
    Foreground: "#000000",
  },
  {
    id: 96,
    Brand: "#C1D105",
    Accent: "#C1D105",
    Background: "#1E2025",
    Foreground: "#FFFFFF",
  },
  {
    id: 97,
    Brand: "#F37C21",
    Accent: "#F37C21",
    Background: "#05051E",
    Foreground: "#FFFFFF",
  },
  {
    id: 98,
    Brand: "#E8A300",
    Accent: "#E8A300",
    Background: "#131313",
    Foreground: "#FFFFFF",
  },
  {
    id: 99,
    Brand: "#FCDF50",
    Accent: "#FCDF50",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 100,
    Brand: "#E0002D",
    Accent: "#E0002D",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 103,
    Brand: "#00544C",
    Accent: "#00544C",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 104,
    Brand: "#CB0000",
    Accent: "#CB0000",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 105,
    Brand: "#FFDB00",
    Accent: "#FFDB00",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 107,
    Brand: "#F15F38",
    Accent: "#F15F38",
    Background: "#1E2035",
    Foreground: "#FFFFFF",
  },
  {
    id: 108,
    Brand: "#FFB600",
    Accent: "#FFB600",
    Background: "#009752",
    Foreground: "#FFFFFF",
  },
  {
    id: 109,
    Brand: "#D7A94F",
    Accent: "#D7A94F",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 110,
    Brand: "#2D634B",
    Accent: "#FFEA30",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 111,
    Brand: "#2AFC75",
    Accent: "#2AFC75",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 112,
    Brand: "#B38D5E",
    Accent: "#B38D5E",
    Background: "#F1F1F1",
    Foreground: "#000000",
  },
  {
    id: 113,
    Brand: "#F14100",
    Accent: "#F14100",
    Background: "#161616",
    Foreground: "#FFFFFF",
  },
  {
    id: 114,
    Brand: "#E63245",
    Accent: "#E63245",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 115,
    Brand: "#E3002B",
    Accent: "#E3002B",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 117,
    Brand: "#CFA155",
    Accent: "#CFA155",
    Background: "#0C0C0C",
    Foreground: "#FFFFFF",
  },
  {
    id: 118,
    Brand: "#00A4B5",
    Accent: "#00A4B5",
    Background: "#02151A",
    Foreground: "#FFFFFF",
  },
  {
    id: 119,
    Brand: "#7A0000",
    Accent: "#7A0000",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 120,
    Brand: "#5DCC57",
    Accent: "#5DCC57",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 121,
    Brand: "#6C9D8D",
    Accent: "#6C9D8D",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 122,
    Brand: "#B39260",
    Accent: "#B39260",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 123,
    Brand: "#EDC673",
    Accent: "#EDC673",
    Background: "#D4D4D4",
    Foreground: "#000000",
  },
  {
    id: 124,
    Brand: "#F14100",
    Accent: "#F14100",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 125,
    Brand: "#F14100",
    Accent: "#F14100",
    Background: "#161616",
    Foreground: "#FFFFFF",
  },
  {
    id: 126,
    Brand: "#1DB954",
    Accent: "#1DB954",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 127,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 128,
    Brand: "#FBE528",
    Accent: "#FBE528",
    Background: "#3F4D4D",
    Foreground: "#FFFFFF",
  },
  {
    id: 129,
    Brand: "#BD983F",
    Accent: "#BD983F",
    Background: "#404040",
    Foreground: "#FFFFFF",
  },
  {
    id: 130,
    Brand: "#EDDDA8",
    Accent: "#EDDDA8",
    Background: "#25282F",
    Foreground: "#FFFFFF",
  },
  {
    id: 131,
    Brand: "#009C74",
    Accent: "#009C74",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 132,
    Brand: "#FFDE00",
    Accent: "#FFDE00",
    Background: "#161616",
    Foreground: "#FFFFFF",
  },
  {
    id: 133,
    Brand: "#B3925F",
    Accent: "#B3925F",
    Background: "#1B191A",
    Foreground: "#FFFFFF",
  },
  {
    id: 134,
    Brand: "#FBE528",
    Accent: "#FBE528",
    Background: "#AAAAAA",
    Foreground: "#000000",
  },
  {
    id: 135,
    Brand: "#2C3D4D",
    Accent: "#2C3D4D",
    Background: "#C2C2C2",
    Foreground: "#000000",
  },
  {
    id: 136,
    Brand: "#FC4A4C",
    Accent: "#FC4A4C",
    Background: "#0A636B",
    Foreground: "#FFFFFF",
  },
  {
    id: 137,
    Brand: "#2196F3",
    Accent: "#4CAF50",
    Background: "#FFEB3B",
    Foreground: "#FFC107",
  },
  {
    id: 138,
    Brand: "#EDDDA8",
    Accent: "#EDDDA8",
    Background: "#25282F",
    Foreground: "#FFFFFF",
  },
  {
    id: 139,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 143,
    Brand: "#4426EA",
    Accent: "#4426EA",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 144,
    Brand: "#F79E1B",
    Accent: "#F79E1B",
    Background: "#25282F",
    Foreground: "#FFFFFF",
  },
  {
    id: 145,
    Brand: "#DAC927",
    Accent: "#DAC927",
    Background: "#133A31",
    Foreground: "#FFFFFF",
  },
  {
    id: 146,
    Brand: "#A60303",
    Accent: "#A60303",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 147,
    Brand: "#F8E800",
    Accent: "#F8E800",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 148,
    Brand: "#14805E",
    Accent: "#14805E",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 150,
    Brand: "#0255C2",
    Accent: "#0255C2",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 151,
    Brand: "#BD983F",
    Accent: "#BD983F",
    Background: "#404040",
    Foreground: "#FFFFFF",
  },
  {
    id: 153,
    Brand: "#EDDDA8",
    Accent: "#EDDDA8",
    Background: "#25282F",
    Foreground: "#FFFFFF",
  },
  {
    id: 157,
    Brand: "#F47427",
    Accent: "#F47427",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 158,
    Brand: "#D29D30",
    Accent: "#D29D30",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 162,
    Brand: "#EF6023",
    Accent: "#EF6023",
    Background: "#F1F1F1",
    Foreground: "#000000",
  },
  {
    id: 163,
    Brand: "#544578",
    Accent: "#544578",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 164,
    Brand: "#0071A5",
    Accent: "#0071A5",
    Background: "#DBDBDB",
    Foreground: "#000000",
  },
  {
    id: 165,
    Brand: "#F6CF16",
    Accent: "#F6CF16",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 166,
    Brand: "#E0CB09",
    Accent: "#E0CB09",
    Background: "#1B3555",
    Foreground: "#FFFFFF",
  },
  {
    id: 167,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 168,
    Brand: "#FCB501",
    Accent: "#FCB501",
    Background: "#24AEB8",
    Foreground: "#000000",
  },
  {
    id: 169,
    Brand: "#F9693A",
    Accent: "#F9693A",
    Background: "#161415",
    Foreground: "#FFFFFF",
  },
  {
    id: 170,
    Brand: "#FFE044",
    Accent: "#FFE044",
    Background: "#0D3E2E",
    Foreground: "#FFFFFF",
  },
  {
    id: 172,
    Brand: "#EBC805",
    Accent: "#EBC805",
    Background: "#02050E",
    Foreground: "#FFFFFF",
  },
  {
    id: 173,
    Brand: "#EB3B08",
    Accent: "#EB3B08",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 177,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#303741",
    Foreground: "#FFFFFF",
  },
  {
    id: 178,
    Brand: "#213661",
    Accent: "#213661",
    Background: "#F8F9FB",
    Foreground: "#000000",
  },
  {
    id: 179,
    Brand: "#FFFF00",
    Accent: "#FFFF00",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 181,
    Brand: "#DD0000",
    Accent: "#DD0000",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 182,
    Brand: "#4A76A5",
    Accent: "#4A76A5",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 183,
    Brand: "#F7A400",
    Accent: "#F7A400",
    Background: "#03162C",
    Foreground: "#FFFFFF",
  },
  {
    id: 185,
    Brand: "#FCB501",
    Accent: "#FCB501",
    Background: "#1C315F",
    Foreground: "#FFFFFF",
  },
  {
    id: 187,
    Brand: "#D16728",
    Accent: "#D16728",
    Background: "#190D0E",
    Foreground: "#FFFFFF",
  },
  {
    id: 188,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#1E273E",
    Foreground: "#FFFFFF",
  },
  {
    id: 189,
    Brand: "#ECB50D",
    Accent: "#ECB50D",
    Background: "#0E151B",
    Foreground: "#FFFFFF",
  },
  {
    id: 190,
    Brand: "#B70000",
    Accent: "#B70000",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 191,
    Brand: "#FFCC00",
    Accent: "#FFCC00",
    Background: "#1E1E1E",
    Foreground: "#FFFFFF",
  },
  {
    id: 193,
    Brand: "#307CB5",
    Accent: "#307CB5",
    Background: "#DEDEDE",
    Foreground: "#000000",
  },
  {
    id: 197,
    Brand: "#F14100",
    Accent: "#F14100",
    Background: "#161616",
    Foreground: "#FFFFFF",
  },
  {
    id: 198,
    Brand: "#EBC805",
    Accent: "#EBC805",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 200,
    Brand: "#FECB00",
    Accent: "#FECB00",
    Background: "#0A102B",
    Foreground: "#FFFFFF",
  },
  {
    id: 201,
    Brand: "#178342",
    Accent: "#178342",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 202,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 203,
    Brand: "#106046",
    Accent: "#861621",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 204,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 205,
    Brand: "#24BA9D",
    Accent: "#24BA9D",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 206,
    Brand: "#C7373D",
    Accent: "#FFB700",
    Background: "#E6E6E6",
    Foreground: "#000000",
  },
  {
    id: 207,
    Brand: "#3366FF",
    Accent: "#3366FF",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 208,
    Brand: "#F06544",
    Accent: "#F06544",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 209,
    Brand: "#875BEF",
    Accent: "#FFB700",
    Background: "#1E273E",
    Foreground: "#FFFFFF",
  },
  {
    id: 210,
    Brand: "#00AABE",
    Accent: "#00AABE",
    Background: "#282B32",
    Foreground: "#FFFFFF",
  },
  {
    id: 211,
    Brand: "#00CFA6",
    Accent: "#00CFA6",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 212,
    Brand: "#F27404",
    Accent: "#F27404",
    Background: "#003743",
    Foreground: "#FFFFFF",
  },
  {
    id: 213,
    Brand: "#C19434",
    Accent: "#C19434",
    Background: "#141E12",
    Foreground: "#FFFFFF",
  },
  {
    id: 214,
    Brand: "#4E9BC0",
    Accent: "#4E9BC0",
    Background: "#000814",
    Foreground: "#FFFFFF",
  },
  {
    id: 215,
    Brand: "#BC9549",
    Accent: "#BC9549",
    Background: "#161616",
    Foreground: "#FFFFFF",
  },
  {
    id: 216,
    Brand: "#932468",
    Accent: "#932468",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 217,
    Brand: "#F26F21",
    Accent: "#F26F21",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 218,
    Brand: "#EDDDA8",
    Accent: "#EDDDA8",
    Background: "#25282F",
    Foreground: "#FFFFFF",
  },
  {
    id: 221,
    Brand: "#3389FF",
    Accent: "#F9D11C",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 222,
    Brand: "#F2A241",
    Accent: "#FFB700",
    Background: "#051525",
    Foreground: "#FFFFFF",
  },
  {
    id: 225,
    Brand: "#2E9E2D",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 226,
    Brand: "#FF7E00",
    Accent: "#FF7E00",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 227,
    Brand: "#B81E24",
    Accent: "#B81E24",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 228,
    Brand: "#2E9E2D",
    Accent: "#F8E800",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 230,
    Brand: "#FF0039",
    Accent: "#FF0039",
    Background: "#121217",
    Foreground: "#FFFFFF",
  },
  {
    id: 231,
    Brand: "#FFCC05",
    Accent: "#FFCC05",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 233,
    Brand: "#FEC200",
    Accent: "#04872B",
    Background: "#2C2C2C",
    Foreground: "#FFFFFF",
  },
  {
    id: 234,
    Brand: "#F6D006",
    Accent: "#F6D006",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 235,
    Brand: "#FDD903",
    Accent: "#FDD903",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 236,
    Brand: "#58A42A",
    Accent: "#58A42A",
    Background: "#212531",
    Foreground: "#FFFFFF",
  },
  {
    id: 237,
    Brand: "#EBC805",
    Accent: "#EBC805",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 238,
    Brand: "#F6DD3A",
    Accent: "#F6DD3A",
    Background: "#2D2D2D",
    Foreground: "#FFFFFF",
  },
  {
    id: 240,
    Brand: "#1EA8B8",
    Accent: "#1EA8B8",
    Background: "#011113",
    Foreground: "#FFFFFF",
  },
  {
    id: 241,
    Brand: "#F0C403",
    Accent: "#F0C403",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 243,
    Brand: "#FFFF00",
    Accent: "#FFFF00",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 245,
    Brand: "#E66F25",
    Accent: "#E66F25",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 247,
    Brand: "#B70000",
    Accent: "#B70000",
    Background: "#060606",
    Foreground: "#FFFFFF",
  },
  {
    id: 248,
    Brand: "#F3DD16",
    Accent: "#F3DD16",
    Background: "#030116",
    Foreground: "#FFFFFF",
  },
  {
    id: 249,
    Brand: "#ED1C24",
    Accent: "#ED1C24",
    Background: "#0A0D11",
    Foreground: "#FFFFFF",
  },
  {
    id: 250,
    Brand: "#ED1C24",
    Accent: "#ED1C24",
    Background: "#0A0D11",
    Foreground: "#FFFFFF",
  },
  {
    id: 252,
    Brand: "#14805E",
    Accent: "#14805E",
    Background: "#2D2D2D",
    Foreground: "#FFFFFF",
  },
  {
    id: 253,
    Brand: "#1A47E7",
    Accent: "#1A47E7",
    Background: "#F5F9FB",
    Foreground: "#000000",
  },
  {
    id: 255,
    Brand: "#D0B752",
    Accent: "#D0B752",
    Background: "#0F1300",
    Foreground: "#FFFFFF",
  },
  {
    id: 256,
    Brand: "#C41D3A",
    Accent: "#C41D3A",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 257,
    Brand: "#00CFA6",
    Accent: "#00CFA6",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 260,
    Brand: "#32A3F5",
    Accent: "#32A3F5",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 261,
    Brand: "#9E46BA",
    Accent: "#9E46BA",
    Background: "#322B46",
    Foreground: "#FFFFFF",
  },
  {
    id: 264,
    Brand: "#FFCE48",
    Accent: "#FFCE48",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 265,
    Brand: "#AD9766",
    Accent: "#AD9766",
    Background: "#0D0D0D",
    Foreground: "#FFFFFF",
  },
  {
    id: 266,
    Brand: "#64E202",
    Accent: "#73C500",
    Background: "#191919",
    Foreground: "#FFFFFF",
  },
  {
    id: 267,
    Brand: "#E19C37",
    Accent: "#E19C37",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 269,
    Brand: "#7900A8",
    Accent: "#7900A8",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 271,
    Brand: "#F1C872",
    Accent: "#F1C872",
    Background: "#0A1026",
    Foreground: "#FFFFFF",
  },
  {
    id: 272,
    Brand: "#FF0000",
    Accent: "#FF0000",
    Background: "#1A1A1A",
    Foreground: "#FFFFFF",
  },
  {
    id: 273,
    Brand: "#FFB90C",
    Accent: "#FFB90C",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 277,
    Brand: "#E4055C",
    Accent: "#E4055C",
    Background: "#1C1033",
    Foreground: "#FFFFFF",
  },
  {
    id: 278,
    Brand: "#007939",
    Accent: "#007939",
    Background: "#0D0E12",
    Foreground: "#FFFFFF",
  },
  {
    id: 279,
    Brand: "#D8288F",
    Accent: "#D8288F",
    Background: "#1A1B26",
    Foreground: "#FFFFFF",
  },
  {
    id: 280,
    Brand: "#2073B0",
    Accent: "#2073B0",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 282,
    Brand: "#2E9E2D",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 284,
    Brand: "#EBC805",
    Accent: "#EBC805",
    Background: "#030303",
    Foreground: "#FFFFFF",
  },
  {
    id: 285,
    Brand: "#C60C0C",
    Accent: "#C60C0C",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 286,
    Brand: "#DEB887",
    Accent: "#DEB887",
    Background: "#182623",
    Foreground: "#FFFFFF",
  },
  {
    id: 289,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#030303",
    Foreground: "#FFFFFF",
  },
  {
    id: 290,
    Brand: "#00D6FA",
    Accent: "#00D6FA",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 291,
    Brand: "#ECAA02",
    Accent: "#ECAA02",
    Background: "#091D0B",
    Foreground: "#FFFFFF",
  },
  {
    id: 293,
    Brand: "#AF8A26",
    Accent: "#AF8A26",
    Background: "#0E0E0E",
    Foreground: "#FFFFFF",
  },
  {
    id: 294,
    Brand: "#F8CC46",
    Accent: "#F8CC46",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 295,
    Brand: "#E0D0A5",
    Accent: "#E0D0A5",
    Background: "#212842",
    Foreground: "#FFFFFF",
  },
  {
    id: 297,
    Brand: "#E4B56F",
    Accent: "#E4B56F",
    Background: "#0B1014",
    Foreground: "#FFFFFF",
  },
  {
    id: 299,
    Brand: "#EDCC85",
    Accent: "#EDCC85",
    Background: "#141414",
    Foreground: "#FFFFFF",
  },
  {
    id: 301,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 302,
    Brand: "#2196F3",
    Accent: "#2196F3",
    Background: "#E4F2FD",
    Foreground: "#000000",
  },
  {
    id: 303,
    Brand: "#42A037",
    Accent: "#42A037",
    Background: "#141416",
    Foreground: "#FFFFFF",
  },
  {
    id: 304,
    Brand: "#F1C033",
    Accent: "#F1C033",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 305,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#161C33",
    Foreground: "#FFFFFF",
  },
  {
    id: 307,
    Brand: "#69428E",
    Accent: "#69428E",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 308,
    Brand: "#ED1C24",
    Accent: "#ED1C24",
    Background: "#0A0D11",
    Foreground: "#FFFFFF",
  },
  {
    id: 309,
    Brand: "#EBC805",
    Accent: "#EBC805",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 310,
    Brand: "#5C9FF8",
    Accent: "#5C9FF8",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 311,
    Brand: "#2E8F3D",
    Accent: "#2E8F3D",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 313,
    Brand: "#1573A9",
    Accent: "#1573A9",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 314,
    Brand: "#EEBE1C",
    Accent: "#EEBE1C",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 316,
    Brand: "#074B9B",
    Accent: "#074B9B",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 317,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 319,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 320,
    Brand: "#FDD835",
    Accent: "#FDD835",
    Background: "#161E21",
    Foreground: "#FFFFFF",
  },
  {
    id: 321,
    Brand: "#FFB700",
    Accent: "#FFB700",
    Background: "#0D0D0D",
    Foreground: "#FFFFFF",
  },
  {
    id: 322,
    Brand: "#FFDF1B",
    Accent: "#FFDF1B",
    Background: "#242424",
    Foreground: "#FFFFFF",
  },
  {
    id: 324,
    Brand: "#F6F195",
    Accent: "#F6F195",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 325,
    Brand: "#FF8200",
    Accent: "#FF8200",
    Background: "#0E151B",
    Foreground: "#FFFFFF",
  },
  {
    id: 326,
    Brand: "#129D48",
    Accent: "#129D48",
    Background: "#11161C",
    Foreground: "#FFFFFF",
  },
  {
    id: 327,
    Brand: "#FF8200",
    Accent: "#FF8200",
    Background: "#0E151B",
    Foreground: "#FFFFFF",
  },
  {
    id: 328,
    Brand: "#FFD200",
    Accent: "#FFD200",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 329,
    Brand: "#F7A400",
    Accent: "#F7A400",
    Background: "#03162C",
    Foreground: "#FFFFFF",
  },
  {
    id: 330,
    Brand: "#D03C3E",
    Accent: "#D03C3E",
    Background: "#15191C",
    Foreground: "#FFFFFF",
  },
  {
    id: 331,
    Brand: "#1C8A07",
    Accent: "#1C8A07",
    Background: "#0E0E0E",
    Foreground: "#FFFFFF",
  },
  {
    id: 332,
    Brand: "#F5BC3D",
    Accent: "#F5BC3D",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 333,
    Brand: "#00B0F0",
    Accent: "#00B0F0",
    Background: "#28274D",
    Foreground: "#FFFFFF",
  },
  {
    id: 334,
    Brand: "#2EAD1D",
    Accent: "#2EAD1D",
    Background: "#1C1E1E",
    Foreground: "#FFFFFF",
  },
  {
    id: 336,
    Brand: "#C5A046",
    Accent: "#C5A046",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 337,
    Brand: "#DAC927",
    Accent: "#DAC927",
    Background: "#003628",
    Foreground: "#FFFFFF",
  },
  {
    id: 340,
    Brand: "#FFAA00",
    Accent: "#FFAA00",
    Background: "#0D0D0D",
    Foreground: "#FFFFFF",
  },
  {
    id: 341,
    Brand: "#FFCC00",
    Accent: "#FFCC00",
    Background: "#404040",
    Foreground: "#FFFFFF",
  },
  {
    id: 342,
    Brand: "#FF9C00",
    Accent: "#FF9C00",
    Background: "#14171D",
    Foreground: "#FFFFFF",
  },
  {
    id: 343,
    Brand: "#FECB00",
    Accent: "#FECB00",
    Background: "#004822",
    Foreground: "#FFFFFF",
  },
  {
    id: 344,
    Brand: "#3BA437",
    Accent: "#3BA437",
    Background: "#191919",
    Foreground: "#FFFFFF",
  },
  {
    id: 346,
    Brand: "#CBB640",
    Accent: "#CBB640",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 350,
    Brand: "#FF8200",
    Accent: "#FF8200",
    Background: "#0E151B",
    Foreground: "#FFFFFF",
  },
  {
    id: 384,
    Brand: "#FF8200",
    Accent: "#FF8200",
    Background: "#181B24",
    Foreground: "#FFFFFF",
  },
  {
    id: 385,
    Brand: "#FF8200",
    Accent: "#FF8200",
    Background: "#181B24",
    Foreground: "#FFFFFF",
  },
  {
    id: 387,
    Brand: "#EBCC06",
    Accent: "#EBCC06",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 388,
    Brand: "#C79E4F",
    Accent: "#C79E4F",
    Background: "#000000",
    Foreground: "#FFFFFF",
  },
  {
    id: 389,
    Brand: "#2661A9",
    Accent: "#2661A9",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 390,
    Brand: "#F0BA0D",
    Accent: "#F0BA0D",
    Background: "#1B1B26",
    Foreground: "#FFFFFF",
  },
  {
    id: 391,
    Brand: "#30A22F",
    Accent: "#30A22F",
    Background: "#262626",
    Foreground: "#FFFFFF",
  },
  {
    id: 392,
    Brand: "#00AABE",
    Accent: "#00AABE",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 393,
    Brand: "#FFAF00",
    Accent: "#FFAF00",
    Background: "#082041",
    Foreground: "#FFFFFF",
  },
  {
    id: 394,
    Brand: "#00788C",
    Accent: "#00788C",
    Background: "#FFFFFF",
    Foreground: "#000000",
  },
  {
    id: 397,
    Brand: "#FFEF48",
    Accent: "#FFEF48",
    Background: "#160D63",
    Foreground: "#FFFFFF",
  },
  {
    id: 398,
    Brand: "#FFD531",
    Accent: "#FFD531",
    Background: "#2B2D30",
    Foreground: "#FFFFFF",
  },
  {
    id: 399,
    Brand: "#2CB56D",
    Accent: "#2CB56D",
    Background: "#0E1727",
    Foreground: "#FFFFFF",
  },
  {
    id: 400,
    Brand: "#FD7702",
    Accent: "#FD7702",
    Background: "#021426",
    Foreground: "#FFFFFF",
  },
  {
    id: 402,
    Brand: "#F8AC00",
    Accent: "#F8AC00",
    Background: "#08091D",
    Foreground: "#FFFFFF",
  },
  {
    id: 555,
    Brand: "#F9521B",
    Accent: "#FFAE2B",
    Background: "#0A0A0A",
    Foreground: "#FFFFFF",
  },
];

class CssVariablesGenerator {
  /**
   * Package generates CSS variables based on provided design system
   * which includes colors and variations (optional) and/or other optional properties,
   *
   * @author Karen Grigoryan (karen.grigoryan.h@digtiain.com)
   * @version 1.2.0
   *
   * @param {Array.<SkinningDesignSystem>} designSystem       - Application design system
   * @param {Object} [options]                                - Additional options
   * @param {string} [options.prefix]                         - CSS variable prefix (ex. prefix: 'my-prefix' -> var(--my-prefix-background))
   * @param {boolean} [options.generateForegroundColors]      - Generate foreground color css variable based on top-level color luminance
   *
   * @class
   *
   * @todo Add colors update functionality
   */
  constructor(designSystem = [], options = {}) {
    this.designSystem = designSystem; // provided colors
    this.prefix = options.prefix || "sport-digi"; // css variables name prefix (ex. --sport-digi-background)
    this.generateForegroundColors = options.generateForegroundColors || false;

    // -------------------- bindings
    this.addCssVariableToRoot = this.addCssVariableToRoot.bind(this);

    this.cssVariablesArr = []; // result css variables
  }

  /* --- core methods --- */

  /**
   * Generate CSS variables and add them to the :root (<html>) element
   *
   * @return {undefined}
   * @public
   */
  init() {
    this.generateCssVariables();
    return this.addGeneratedCssVariablesToRoot();
  }

  /**
   * Generate CSS variables for top level colors + their variations and static properties like 'border-radius'
   *
   * @return {undefined}
   * @private
   */
  generateCssVariables() {
    this.designSystem.forEach((propertyObj = {}) => {
      // 1. extract properties
      const { name, color, value, variations } = propertyObj;

      // handle colors
      if (color) {
        // 2. add base color css variable
        this.addCssVariable(this.generateCssVariableName(name), color);

        // 3. generate foreground if option is enabled
        if (this.generateForegroundColors) {
          this.addCssVariable(
            this.generateCssVariableName(`${name}-foreground`),
            this.generateForegroundColor(color)
          );
        }

        // 4. generate new colors if those are provided
        if (variations) {
          const variationsArr = Object.entries(variations);
          const handleVariablesGenerationForVariation =
            this.generateCssColorVariablesForVariation(name, color);

          variationsArr.forEach(handleVariablesGenerationForVariation);
        }
      }

      // handle static values (e.g. 'border-radius', 'shadow', etc.)
      else if (value) {
        this.addCssVariable(
          this.generateCssVariableName(name, "static"),
          `${value}`
        );

        if (variations) {
          const variationsArr = Object.entries(variations);
          const handleVariablesGenerationForVariation =
            this.generateCssValueVariablesForVariation(name, value);

          variationsArr.forEach(handleVariablesGenerationForVariation);
        }
      }
    });
  }

  /**
   * Generate new color and CSS variables for variations using modifiers and levels
   *
   * @param {string} name
   * @param {number} value
   *
   * @return {Function}
   * @private
   */
  generateCssValueVariablesForVariation(name, value) {
    const generateNewValue =
      this.generateNewValueBasedOnModifierAndLevel.bind(this);
    return this.generateCssVariablesForVariation(name, value, generateNewValue);
  }

  /**
   * Generate new color and CSS variables for variations using modifiers and levels
   *
   * @param {string} baseColorName
   * @param {string} baseColor
   *
   * @return {Function}
   * @private
   */
  generateCssColorVariablesForVariation(baseColorName, baseColor) {
    const generateNewValue =
      this.generateNewColorBasedOnModifierAndLevel.bind(this);
    return this.generateCssVariablesForVariation(
      baseColorName,
      baseColor,
      generateNewValue
    );
  }

  /**
   * Generate new cvalueolor and CSS variables for variations using modifiers, levels and newValueGenaratorFunction
   *
   * @param {string} name
   * @param {string|number} value
   * @param {Function} generateNewValue
   *
   * @return {undefined}
   * @private
   */
  generateCssVariablesForVariation(name, value, generateNewValue = () => {}) {
    return (variation = []) => {
      // 1. extract properties
      const [modifier, levelsArr] = variation;

      // 2. create css variable for every level
      levelsArr.forEach((level) => {
        // 2.1 generate css variable name and new color based on modification and level
        const cssVariableName = this.generateCssVariableName(
          name,
          modifier,
          level
        );
        const newValue = generateNewValue(value, modifier, level);

        // 2.2 add newly created css variables to variables list
        this.addCssVariable(cssVariableName, newValue);
      });
    };
  }

  /**
   * Add all generated CSS variables to Root (<html>) element
   *
   * @return {undefined}
   * @private
   */
  addGeneratedCssVariablesToRoot() {
    this.cssVariablesArr.forEach(this.addCssVariableToRoot);
    return this.cssVariablesArr;
  }

  /* --- helper methods --- */

  /**
   * Generate new color based on modification type and level
   * using "polished" lib
   *
   * @param {string} value
   * @param {string} modifier
   * @param {number} level
   *
   * @return {string}
   * @private
   */
  generateNewValueBasedOnModifierAndLevel(value, modifier, level) {
    let newValue = null;
    switch (modifier) {
      case "multiply":
        newValue = value * level;
        break;
      case "divide":
        newValue = value / level;
        break;
      default:
        newValue = value;
        break;
    }

    return newValue;
  }

  /**
   * Generate new color based on modification type and level
   * using "polished" lib
   *
   * @param {string} color        - HEX or RGB/A color
   * @param {string} modifier     - (darken, lighten, opacity, level)
   * @param {number} level        - in percentage (5, 10, 30)
   *
   * @return {string}
   * @private
   */
  generateNewColorBasedOnModifierAndLevel(color, modifier, level) {
    const convertedLevel = level / 100; // convert provided level (as percentage) to 0. based float

    switch (modifier) {
      case "lighten":
        return lighten(convertedLevel, color);
      case "darken":
        return darken(convertedLevel, color);
      case "opacity":
        return rgba(color, convertedLevel);
      case "level":
        // in case of "level" modifier, function will generate new color based on base color luminance
        // example: base color is '#000' which is dark in case of luminance, so it's level will be lighter
        return getLuminance(color) <= 0.5
          ? lighten(convertedLevel, color)
          : darken(convertedLevel, color);
      default:
        return color;
    }
  }

  /**
   * Generate white or black color based on provided color luminance
   *
   * @param {string} color - HEX or RGB/A color
   *
   * @return {string}
   * @private
   */
  generateForegroundColor(color) {
    return getLuminance(color) <= 0.5 ? "#ffffff" : "#000000";
  }

  /**
   * Generate CSS variable name based on:
   *
   * @param {string} name             - (background, foreground, etc...)
   * @param {string} [modifier]       - optional (darken, lighten, opacity...)
   * @param {String|Number} [level]   - optional if no modifier provided (1, 50, 100...)
   *
   * @return {string} - Ex.: "--background_lighten_10"
   * @private
   */
  generateCssVariableName(name, modifier, level) {
    // 1. format variable name kebab-case
    const formattedName = this.convertToKebabCase(name);

    // 2. create required skeleton
    let variable = `--${this.prefix}-${formattedName}`;

    // 3. add "modifier" and "level" parts
    if (modifier) variable += `--${modifier}`;
    if (level) variable += `-${level}`;

    // 4. return generated name
    return variable;
  }

  /**
   * Add provided CSS variable to instance CSS variables array
   *
   * @param {string} name     - variable name
   * @param {string} value    - value
   *
   * @return {undefined}
   * @private
   */
  addCssVariable(name, value) {
    this.cssVariablesArr.push({ name, value });
  }

  /**
   * Add CSS variable to Root (<html>) element using variable name and color
   *
   * @param {Object} nameAndColorObj
   * @param {string} nameAndColorObj.name     - variable name
   * @param {string} nameAndColorObj.value    - property value
   *
   * @return {undefined}
   * @private
   */
  addCssVariableToRoot({ name, value }) {
    // console.log(name, value);
    // this.targetElement.style.setProperty(name, value);
  }

  /**
   * Converts provided string to kebab-case.
   * Supports camel, pascal and snake cases.
   *
   * @see https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149
   * @param {string} str
   */
  convertToKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2") // get all lowercase letters that are near to uppercase ones
      .replace(/[\s_]+/g, "-") // replace all spaces and low dash
      .toLowerCase();
  }

  /**
   * Returns reference of the target element if it's provided.
   * Otherwise it will return the reference of the root <html> element.
   *
   * @param {HTMLElement|string} target reference or CSS selector string
   * @returns {HTMLElement}
   *
   * @private
   */
}

class Skinner {
  /**
   * Skinner - Skinning System based on native CSS variables
   *
   * Package generates CSS variables using <CssVariablesGenerator> based on design system and base colors
   *
   * @version 1.2.0
   *
   * @param {Array.<SkinningDesignSystem>} designSystem                           - Application design system
 						- 4 base colors and other properties
   * @param {Object} [cssVariablesGeneratorOptions]                               - Additional options
   * @param {string} [cssVariablesGeneratorOptions.prefix]                        - CSS variable prefix (ex. prefix: 'my-prefix' -> var(--my-prefix-background))
   * @param {boolean} [cssVariablesGeneratorOptions.generateForegroundColors]     - Generate foreground color css variable based on top-level color luminance
   *
   * @class
   * @example
   * const skinner = new Skinner(defaultSkin, options, {
   *    generateForegroundColors: true
   * });
   * skinner.init();
   */
  constructor(designSystem = [], cssVariablesGeneratorOptions = {}) {
    this.designSystem = designSystem; // provided colors and other properties
    this.cssVariablesGeneratorOptions = cssVariablesGeneratorOptions;
    this.generateCssVariablesInstance = null;
  }

  /* --- core methods --- */

  /**
   * Generate variables and add them to the :root (<html>) element
   *
   * @return {undefined}
   * @public
   */
  init(colors) {
    this.doSkinning(colors);
    return this.generateCssVariables(colors.id);
  }

  /**
   * Merge base colors and other properties with application's design system
   *
   * @return {undefined}
   * @private
   */
  doSkinning(colors) {
    Object.entries(colors).forEach(([name, value]) => {
      const propertyNameLowerCase = name.toLowerCase();
      const designSystemProperties = this.designSystem.map((prop) => prop.name);

      // if property is exists in provided design, system override it
      if (
        designSystemProperties.includes(name) ||
        designSystemProperties.includes(propertyNameLowerCase)
      ) {
        this.designSystem = this.designSystem.map((rule) => {
          const ruleNameLowerCase = rule.name.toLowerCase();
          const validProperty = Boolean(value);
          const ruleFound = ruleNameLowerCase === propertyNameLowerCase;

          // override rule's color or value if it's provided in base properties
          if (ruleFound && validProperty) {
            if (rule.color) rule.color = value;
            if (rule.value) rule.value = value;
          }

          return rule;
        });
      }

      // otherwise create static property
      else {
        this.designSystem.push({
          name,
          value,
        });
      }
    });
  }

  /**
   * Generate CSS variables based on design system and additional options
   *
   * @return {undefined}
   * @private
   */
  generateCssVariables(id) {
    this.generateCssVariablesInstance = new CssVariablesGenerator(
      this.designSystem,
      this.cssVariablesGeneratorOptions
    );
    // this.generateCssVariablesInstance.init();
    let cssVariablesArray = this.generateCssVariablesInstance.init();

    return cssVariablesArray;

    // console.log(this.generateCssVariablesInstance.init());

    // console.log(this.designSystem);
  }
}

const defaultSkin = [
  {
    name: "background",
    color: "#262626",
    variations: {
      level: [-4, 5, 10, 15],
      opacity: [50],
    },
  },

  {
    name: "foreground",
    color: "#fff",
    variations: {
      level: [20, 40, 60],
    },
  },

  {
    name: "accent",
    color: "#ffb700",
    variations: {
      darken: [20, 10],
      opacity: [50],
    },
  },

  {
    name: "brand",
    color: "#f14100",
    variations: {
      darken: [20, 10],
      opacity: [50],
    },
  },

  {
    name: "border-radius",
    value: "2px",
    variations: {
      multiply: [2, 3, 4],
      divide: [2],
    },
  },

  { name: "odd", value: "#262626" },

  { name: "header", value: "#404040" },

  {
    name: "background-mobile",
    color: "#1a1a1a",
  },

  {
    name: "star",
    color: "#ffb700",
  },

  {
    name: "red",
    color: "#d40000",
  },

  {
    name: "green",
    color: "#00912C",
  },

  {
    name: "white",
    color: "#fff",
  },

  {
    name: "black",
    color: "#000",
  },

  {
    name: "button-background",
    color: "#4D4D4D",
  },

  {
    name: "button-foreground",
    color: "#999",
  },
];

const skinner = new Skinner(defaultSkin, {
  generateForegroundColors: true,
});

module.exports = plugin = (opts = {}) => {
  const matchedRoots = [];
  const matchedSelectors = [];
  const pId = opts.partnerID.split(".")[0];
  const curId = cmsColors.filter((p) => p.id == parseInt(pId));
  let arr;
  if (curId && curId.length > 0) {
    arr = skinner.init(curId[0]);
  }

  return {
    postcssPlugin: "analyzer",
    Once(root, { result }) {
      if (curId && curId.length > 0) {
        rootRule = postcss.rule({ selector: ":root" });
        arr.forEach((a) => {
          rootRule.append({ prop: a.name, value: a.value });
        });

        root.prepend(rootRule);
      }
    },

    RootExit(root, { result }) {
      // console.log(data);
      // console.log(`plugin has processed ${opts.partnerID} css`);
    },
  };
};

plugin.postcss = true;
