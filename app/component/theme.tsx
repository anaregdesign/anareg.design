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
            primaryTheme: new ColorTheme('#FF5733', '#33FF57', '#3357FF'),
            pastelTheme: new ColorTheme('#F6CED8', '#FFF1D0', '#B5EAD7'),
            charcoalTheme: new ColorTheme('#333333', '#555555', '#777777'),
            oceanTheme: new ColorTheme('#025E73', '#038C8C', '#02A7A7'),
            vintageTheme: new ColorTheme('#3B2E2D', '#6E4C4C', '#A68773'),
            modernTheme: new ColorTheme('#1A1A1A', '#444444', '#666666'),
        };
    }

    getRandomTheme(): ColorTheme {
        const themeKeys = Object.keys(this.themes);
        const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
        return this.themes[randomKey];
    }
}

export const themeRepository = new ThemaRepository();

export function Color1({ children, theme = themeRepository.themes.primaryTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.primaryColor }}>
            {children}
        </span>
    );
}

export function Color2({ children, theme = themeRepository.themes.primaryTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.secondaryColor }}>
            {children}
        </span>
    );
}

export function Color3({ children, theme = themeRepository.themes.primaryTheme }: { children: React.ReactNode; theme?: ColorTheme }) {
    return (
        <span style={{ color: theme.tertiaryColor }}>
            {children}
        </span>
    );
}
