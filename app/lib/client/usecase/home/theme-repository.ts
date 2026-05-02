export type ColorTheme = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
};

const themes = {
  contrastTheme: {
    primaryColor: "#C62828",
    secondaryColor: "#2E7D32",
    tertiaryColor: "#1565C0",
  },
  vividTheme: {
    primaryColor: "#AD1457",
    secondaryColor: "#6A1B9A",
    tertiaryColor: "#283593",
  },
  radiantTheme: {
    primaryColor: "#EF6C00",
    secondaryColor: "#00897B",
    tertiaryColor: "#5D4037",
  },
  boldTheme: {
    primaryColor: "#303F9F",
    secondaryColor: "#C2185B",
    tertiaryColor: "#00796B",
  },
  dynamicTheme: {
    primaryColor: "#512DA8",
    secondaryColor: "#1976D2",
    tertiaryColor: "#E65100",
  },
} satisfies Record<string, ColorTheme>;

export const themeRepository = {
  getRandomTheme(): ColorTheme {
    const themeKeys = Object.keys(themes) as Array<keyof typeof themes>;
    const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];

    return themes[randomKey];
  },
};
