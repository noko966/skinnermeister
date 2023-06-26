let current = 0;

function setCSSOverride(id) {
    console.log("==========   Current partner: ", id);
    let link = document.getElementById("partnerStyleCssLink");
    if (link) {
      link.href = `https://localhost:44397/Partners/${id}/Styles/web.css?${Date.now()}`;
    } else {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href =  `https://localhost:44397/Partners/${id}/Styles/web.css?${Date.now()}`;
      link.media = "all";
      link.id = "partnerStyleCssLink";
      head.appendChild(link);
      console.log("==========   CSS Link created ");
    }
  }
  
  let partners = [
    0,
    1,
    100,
    105,
    107,
    109,
    11,
    110,
    1102420,
    113,
    114,
    117,
    118,
    119,
    120,
    121,
    122,
    125,
    126,
    127,
    128,
    130,
    131,
    132,
    134,
    136,
    137,
    139,
    14,
    143,
    144,
    145,
    146,
    147,
    148,
    151,
    157,
    163,
    164,
    165,
    166,
    167,
    169,
    170,
    173,
    179,
    181,
    182,
    183,
    185,
    188,
    189,
    190,
    191,
    193,
    197,
    198,
    200,
    201,
    205,
    206,
    209,
    210,
    211,
    212,
    213,
    215,
    217,
    221,
    222,
    225,
    226,
    227,
    228,
    23,
    230,
    231,
    233,
    234,
    235,
    236,
    237,
    238,
    24,
    240,
    243,
    245,
    247,
    248,
    249,
    250,
    252,
    253,
    255,
    256,
    257,
    258,
    259,
    260,
    261,
    262,
    264,
    265,
    266,
    267,
    269,
    271,
    272,
    273,
    277,
    279,
    280,
    281,
    282,
    283,
    284,
    285,
    286,
    29,
    290,
    291,
    294,
    295,
    297,
    299,
    300,
    3000004,
    3000012,
    3000013,
    3000019,
    3000023,
    3000052,
    3000056,
    3000057,
    3000060,
    3000061,
    3000066,
    3000067,
    3000100,
    301,
    302,
    303,
    304,
    305,
    307,
    308,
    309,
    310,
    311,
    312,
    313,
    314,
    315,
    316,
    317,
    318,
    319,
    321,
    322,
    323,
    324,
    325,
    326,
    327,
    328,
    329,
    330,
    331,
    332,
    333,
    334,
    335,
    336,
    337,
    340,
    341,
    342,
    343,
    344,
    346,
    350,
    355,
    357,
    358,
    359,
    360,
    362,
    368,
    369,
    38,
    384,
    385,
    387,
    388,
    389,
    390,
    391,
    392,
    393,
    394,
    395,
    396,
    397,
    398,
    399,
    40,
    400,
    401,
    402,
    403,
    404,
    406,
    407,
    409,
    41,
    410,
    412,
    413,
    414,
    415,
    416,
    418,
    419,
    421,
    422,
    424,
    425,
    427,
    428,
    429,
    43,
    430,
    433,
    434,
    435,
    436,
    438,
    439,
    440,
    441,
    444,
    446,
    447,
    449,
    45,
    451,
    452,
    453,
    455,
    456,
    457,
    458,
    459,
    46,
    461,
    462,
    463,
    464,
    466,
    468,
    469,
    472,
    473,
    474,
    478,
    479,
    480,
    483,
    484,
    486,
    488,
    490,
    496,
    497,
    498,
    499,
    500,
    502,
    504,
    506,
    507,
    509,
    510,
    513,
    514,
    515,
    516,
    518,
    519,
    524,
    525,
    526,
    527,
    528,
    53,
    532,
    533,
    534,
    54,
    540,
    555,
    557,
    563,
    565,
    566,
    567,
    568,
    569,
    570,
    572,
    573,
    576,
    578,
    581,
    584,
    586,
    588,
    591,
    62,
    63,
    64,
    65,
    69,
    71,
    72,
    76,
    79,
    80,
    81,
    83,
    89,
    9,
    90,
    94,
    95,
    97,
    98,
    99
]

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
      setCSSOverride(partners[current--]);
    }
  });
  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
      setCSSOverride(partners[current++]);
    }
  });
  