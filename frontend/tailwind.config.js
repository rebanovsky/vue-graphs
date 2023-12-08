/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    fill: ["hover"],
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  variants: { borderStyle: ["responsive"] },
  plugins: [require("@tailwindcss/aspect-ratio")],
  theme: {
    colors: {
      background: "#F1F4F6",
      transparent: "transparent",
      darksecondary: "#616186",
      white: "#ffffff",
      error: "#e24646",
      highlight: "rgb(0 59 255)",
      highlightdark: "rgb(0 195 255)",
      midnight: "#1a1b1f",
      deeppurple: "rgb(13, 15, 36)",
      aianswer: "rgb(231 237 242);",
      darkaianswer: "rgb(18 24 40)",
      aitext: "#002f5a",
      darkaitext: "rgb(65 142 211);",
      blueTest: "#384959",
      box: "",
      box2: "",
      expbox: "#ebeef2",
      darkexpbox: "#192030",
      darkcard: "rgb(33 39 57);",
      searchbox: "#c5d7ec",
      arrowbox: "#d7e1ec",
      darkarrowbox: "#1e293b",
      texthl: "#d1e2ed",
      darkpopup: "#131a29",
      popup: "#e6eefa",
      darkbox: "#101e31",
      darkboxborder: "#272a2e",
      darkboxboxborder: "rgb(71, 77, 93)",
      darkbboxborder: "#35394a",
      boxboxborder: "rgb(180, 188, 197)",
      boxborder: "#b2becd",
      boxborderlight: "#dbe5f2",
      boxborderbox: "rgba(80, 82, 112, 0.25)",
      boxlight: "rgb(212 221 232)",
      upperribbon: "#90969c",
      darkgridline: "#282c3a",
      gridline: "#c7ccd6",
      darkupperribbon: "#2f3945",
      bars: "#007efd",
      barsblue: "#DB7702",
      hovernav: "rgb(137, 136, 156, 0.2)",
      darknavborder: "rgba(215, 232, 241)",
      darkbars: "#00adff",
      stroke: "#0577f7;",
      darkstroke: "rgb(10 175 242)",
      bg2: "#e1e8ef",
      darkbg2: "#13141c",
      darkbg3: "#222433",
      strokedark: "",
      grid: "#c5c4cc",
      griddark: "rgba(94, 93, 104, 0.5)",
      gray: "#cacbcc",
      darkgray: "#304159",
      pricetag: "#ffaa00",
      darkpricetag: "#ff9100",
      neg: "#f8d0d7",
      pos: "rgb(182 233 195)",
      darkneg: "#cf0c39",
      darkpos: "rgb(7 118 10)",
      negdm: "#de0d30",
      posdm: "#b6ffd1",
      darknegdm: "#a9ffca",
      darkposdm: "#07760a",
      bboxborder: "rgb(196 198 209)",
      darkline1: "rgb(242, 130, 10)",
      darkline2: "#0ad7f2",
      line1: "rgb(245 102 6)",
      line2: "#00b3ff",
      darkhover: "#111a2b",
      hover: "#000000",
      twitter: "#1DA1F2",
      togglerhover: "#7777a432",
      slate: {
        25: "#ebeef2",
        50: "#e8ecf1",
        100: "#f1f5f9",
        200: "#e3e9f0",
        300: "#d7e1ea",
        400: "#8fa0b5",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#181e36",
        900: "rgb(17 19 25)",
      },
      blue: {
        25: "#ebeef2",
        50: "#dbeafe",
        100: "#f1f5f9",
        200: "#e3e9f0",
        300: "#d7e1ea",
        400: "#8fa0b5",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#181e36",
        900: "#0068ff",
      },
      harlequin: {
        50: "#e6f7e6",
        100: "#caf8c5",
        200: "#00fc77",
        300: "#2bd81d",
        400: "#35d00d",
        500: "#2b8924",
        900: "#0f1b0e",
      },
      green: {
        100: "#caf8c5",
        200: "#00fc77",
        300: "#0dd400",
        400: "#13c300",
      },
      orange: {
        200: "ffa657",
        300: "#ff9639",
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
      },
      highlighter: {
        blue: "#b9d4ff",
        darkblue: "#0038e3",
        lightblue: "#c8d3ff",
        darklightblue: "#0546d1",
        yellow: "#5a5700",
        darkyellow: "#f5f3b7",
        red: "#f1bfce;",
        darkred: "#8d0174",
        turquoise: "#afddff",
        darkturquoise: "#02815f",
        green: "#415B48",
        darkgreen: "#a5e4b2",
        orange: "#594730",
        darkorange: "#F8DDA1",
        pink: "rgb(224 202 255)",
        darkpink: "#5627a2",
        purple: "#ea6344",
        darkpurple: "#ffb2a1",
        neongreen: "#37554A",
        darkneongreen: "#A8F8EF",
        wine: "#fd94ea",
        darkwine: "#4f0b4c",
      },
      red: {
        10: "#f7d7e0",
        50: "#e72000",
        60: "#ff004b",
        70: "#c80037",
      },
      orange: {
        50: "#ff8225",
      },
    },
    extend: {
      rotate: {
        neg180: "-180deg",
      },
      boxShadow: {
        btn: "0px 0px 4px 0 rgba(0, 253, 0, 0.45)",
        topnavsh: "0px 0px 5px -3px rgba(60, 60, 60, 1)",
        bottomsh: "0px 20px 12px 12px rgba(226, 232, 240, 1)",
        bottomshdark: "0px 20px 12px 12px rgba(17, 19, 25, 1)",
        arrowboxsh: "0px 0px 0px 0px rgba(0,0,0,0);",
        boxshextralight: "0px 0px 4px 0px rgba(0,0,0,0.12)",
        boxshgreen: "0px 0px 12px 1px rgba(54, 255, 0, 1)",
        boxshlight: "0px 0px 12px 2px rgba(160, 160, 160, 0.1);",
        boxsh: "0px 6px 12px 0px rgba(17, 19, 25, 0.1)",
        darkboxshlight: "0px 0px 10px 4px rgba(40, 40, 40, 0.1)",
        popupsh: "0px 0px 32px 0px rgba(0,0,0,0.15);",
        noshadow: "0px 0px 0px 0px rgba(0,0,0,0);",
        popupshdark: "0px 0px 36px 0px rgba(0,0,0,0.6);",
        boxshblue: "0px 0px 2px 0px rgba(0,120,221,0.4);",
        boxshdark: "0px 0px 12px 1px rgba(150,150,150,0.5);",
        searchsh: "inset 0px 0px 2px 0px rgba(0,0,0,0.08);",
        expboxsh: "inset 0px 0px 6px 0px rgba(0,0,0,0.1);",
        darksearchsh: "inset 0px 0px 4px 0px rgba(0,0,0,0.2);",
        hoversh: "0 0 4px 0px rgba(0,0,0,0.2)",
        darkhoversh: "0 0 8px 0px rgba(0,0,0,0.4)",
        darkpricetagsh: "0px 0px 4px 1px rgba(224,128,11,1);",
        sidersh: "inset -3px 0px 3px 0px rgba(111,109,120,0.3);",
        scrollshtopmain: "inset 0px 8px 8px -12px rgba(241, 244, 246, 0.7)",
        scrollshtop: "inset 0px 28px 28px -12px rgba(241, 244, 246, 0.1)",
        scrollshbot: "inset 0px -28px 28px -12px rgba(241, 244, 246, 0.7)",
        scrollshtopdark: "inset 0px 28px 28px -12px rgba(17, 19, 25, 1)",
        scrollshbotdark: "inset 0px -28px 28px -12px rgba(17, 19, 25, 1)",
        shadowmd:
          "0 1px 5px 1px rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.08);",
        shadowmddark:
          "0 1px 5px 1px rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.08);",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      rotate: {
        m180: "-180deg",
      },
    },
  },
};

// 'midnight': 'rgb(28, 28, 37)'
