export class ColorTheme {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;

    constructor(primaryColor: string, secondaryColor: string, tertiaryColor: string) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.tertiaryColor = tertiaryColor;
    }
}

export class ThemaRepository {
    themes: { [key: string]: ColorTheme };

    constructor() {
        this.themes = {
            contrastTheme: new ColorTheme('#C62828', '#2E7D32', '#1565C0'),
            vividTheme: new ColorTheme('#AD1457', '#6A1B9A', '#283593'),
            radiantTheme: new ColorTheme('#EF6C00', '#00897B', '#5D4037'),
            boldTheme: new ColorTheme('#303F9F', '#C2185B', '#00796B'),
            dynamicTheme: new ColorTheme('#512DA8', '#1976D2', '#E65100'),
        };
    }

    getRandomTheme(): ColorTheme {
        const themeKeys = Object.keys(this.themes);
        const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
        return this.themes[randomKey];
    }
}

export const themeRepository = new ThemaRepository();

export function Color1({ children, theme = themeRepository.themes.contrastTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.primaryColor }}>
            {children}
        </span>
    );
}

export function Color2({ children, theme = themeRepository.themes.contrastTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.secondaryColor }}>
            {children}
        </span>
    );
}

export function Color3({ children, theme = themeRepository.themes.contrastTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.tertiaryColor }}>
            {children}
        </span>
    );
}


