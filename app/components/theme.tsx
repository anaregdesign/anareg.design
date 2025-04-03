export class ColorTheme {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;

  constructor(
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string
  ) {
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.tertiaryColor = tertiaryColor;
  }
}

export class ThemaRepository {
  themes: { [key: string]: ColorTheme };

  constructor() {
    this.themes = {
      contrastTheme: new ColorTheme("#C62828", "#2E7D32", "#1565C0"),
      vividTheme: new ColorTheme("#AD1457", "#6A1B9A", "#283593"),
      radiantTheme: new ColorTheme("#EF6C00", "#00897B", "#5D4037"),
      boldTheme: new ColorTheme("#303F9F", "#C2185B", "#00796B"),
      dynamicTheme: new ColorTheme("#512DA8", "#1976D2", "#E65100"),
    };
  }

  getRandomTheme(): ColorTheme {
    const themeKeys = Object.keys(this.themes);
    const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    return this.themes[randomKey];
  }
}

export const themeRepository = new ThemaRepository();

export function Color1({
  children,
  theme = themeRepository.themes.contrastTheme,
}: {
  children: React.ReactNode;
  theme?: ColorTheme;
}) {
  return (
    <span className="font-bold" style={{ color: theme.primaryColor }}>
      {children}
    </span>
  );
}

export function Color2({
  children,
  theme = themeRepository.themes.contrastTheme,
}: {
  children: React.ReactNode;
  theme?: ColorTheme;
}) {
  return (
    <span className="font-bold" style={{ color: theme.secondaryColor }}>
      {children}
    </span>
  );
}

export function Color3({
  children,
  theme = themeRepository.themes.contrastTheme,
}: {
  children: React.ReactNode;
  theme?: ColorTheme;
}) {
  return (
    <span className="font-bold" style={{ color: theme.tertiaryColor }}>
      {children}
    </span>
  );
}

export function ColofulText({
  children,
  theme = themeRepository.themes.contrastTheme,
}: {
  children: React.ReactNode;
  theme?: ColorTheme;
}) {
  // If children is not a string, fallback to original behavior.
  if (typeof children !== "string") {
    return <span style={{ color: theme.primaryColor }}>{children}</span>;
  }
  const colors = [
    theme.primaryColor,
    theme.secondaryColor,
    theme.tertiaryColor,
  ];
  let prevIndex: number | null = null;
  const coloredCharacters = children.split("").map((char, i) => {
    let colorIndex;
    do {
      colorIndex = Math.floor(Math.random() * colors.length);
    } while (
      prevIndex !== null &&
      colorIndex === prevIndex &&
      colors.length > 1
    );
    prevIndex = colorIndex;
    return (
      <span className="font-bold" key={i} style={{ color: colors[colorIndex] }}>
        {char}
      </span>
    );
  });
  return <>{coloredCharacters}</>;
}
