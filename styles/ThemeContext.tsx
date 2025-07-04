import React, { createContext, useContext, useState } from 'react';
import {
    ColorValue,
    Falsy,
    OpaqueColorValue,
    RecursiveArray,
    RegisteredStyle,
    StyleSheet,
    TextStyle,
    useColorScheme
} from 'react-native';
import { Value3D } from 'react-native-reanimated';

// --- Colors Interface ---
export interface ThemeColors {
    white: ColorValue | undefined;
    primaryDark: ColorValue | undefined;
    primaryContainer: ColorValue | undefined;
    secondaryContainer: ColorValue | undefined;
    onPrimaryContainer: string | undefined;
    onSecondaryContainer: string | undefined;
    onPrimary: ColorValue | undefined;
    notification: string | OpaqueColorValue | undefined;
    surface: ColorValue | undefined;
    warning: ColorValue | undefined;
    buttonText: ColorValue | undefined;
    success: ColorValue | undefined;
    disabled: ColorValue | undefined;
    inputBackground: ColorValue | undefined;
    error: string | OpaqueColorValue | undefined;
    textSecondary: string | undefined;
    border: string | Value3D | OpaqueColorValue | undefined;
    primaryLight: string | undefined;
    card: ColorValue | undefined;
    primary: ColorValue | undefined;
    secondary: ColorValue | undefined;
    accent: ColorValue | undefined;
    background: ColorValue | undefined;
    cardBackground: ColorValue | undefined;
    text: ColorValue | undefined;
    lightText: ColorValue | undefined;
    notificationUnread: string;
    notificationRead: string;
    modalBackground: string;
}

// --- Fonts & Spacing Interfaces ---
export interface ThemeFonts {
    subheader: string | TextStyle | Falsy | RegisteredStyle<TextStyle> | RecursiveArray<TextStyle | Falsy | RegisteredStyle<TextStyle>> | readonly (TextStyle | Falsy | RegisteredStyle<TextStyle>)[];
    small: string | TextStyle | Falsy | RegisteredStyle<TextStyle> | RecursiveArray<TextStyle | Falsy | RegisteredStyle<TextStyle>> | readonly (TextStyle | Falsy | RegisteredStyle<TextStyle>)[];
    header: any;
    heading: string;
    body: string;
    mono: string;
    weightLight: string;
    weightRegular: string;
    weightBold: string;
    bodyBold: string;
}

export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}

export interface ThemeShadows {
    shadow: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
}

// --- Light Theme ---
const lightColors: ThemeColors = {
    primary: '#00394f',                // Rich indigo
    primaryLight: '#a4c8de',           // Lighter indigo shade
    primaryDark: '#3A006B',            // Darker indigo

    secondary: '#AAF0D1',              // Soft mint
    secondaryContainer: '#D2FFF0',     // Even lighter mint for backgrounds
    onSecondaryContainer: '#00394f',   // Dark text on mint backgrounds

    accent: '#42C6A1',                 // Deeper mint / teal accent
    background: '#EBEBEB',             // App background
    cardBackground: '#EBEBEB',         // Card background
    card: '#FFFFFF',

    text: '#3F3D56',                   // Main text
    lightText: '#00394f',              // For lighter surfaces
    textSecondary: '#7C7C7C',          // Secondary text

    border: '#00394f',                 // Border color
    inputBackground: '#FFFFFF',

    error: '#D32F2F',                  // Material red 700
    success: '#388E3C',                // Material green 700
    warning: '#FFA500',                // Orange

    disabled: '#CCCCCC',
    buttonText: '#FFFFFF',

    notificationUnread: '#e3f2fd',     // Light blue-ish
    notificationRead: '#ffffff',
    notification: '#007bff',           // Standard blue notification badge

    modalBackground: 'rgba(0,0,0,0.5)',
    surface: '#f5f5f5',

    onPrimary: '#FFFFFF',
    onPrimaryContainer: undefined,
    primaryContainer: '#e3f2fd',
    white: '#FFFFFF'                   // Explicit white color
};

// --- Dark Theme ---
const darkColors: ThemeColors = {
    primary: '#9A7DCC',                // Softer indigo for dark bg
    primaryLight: '#BFA5E3',           // Lighter indigo
    primaryDark: '#7B5BAA',            // Darker indigo

    secondary: '#52D6B1',              // Mint (matches accent)
    secondaryContainer: '#2C4F46',     // Darker muted mint background
    onSecondaryContainer: '#E1FDF5',   // Light text on mint bg

    accent: '#52D6B1',                 // Minty accent

    background: '#0D1117',             // App background
    surface: '#222222',                // Surfaces
    cardBackground: '#141414',
    card: '#1E1E1E',

    text: '#FFFFFF',
    lightText: '#B1B1C5',
    textSecondary: '#A0A0A0',

    border: '#333333',
    inputBackground: '#1A1A1A',

    error: '#FF6B6B',
    success: '#4CAF50',
    warning: '#FFC107',
    disabled: '#555555',

    buttonText: '#000000',

    notificationUnread: '#1e3a8a',     // Deep indigo for unread
    notificationRead: '#1f2937',      // Dark muted bg
    notification: '#4dabf7',          // Bright notification badge

    modalBackground: 'rgba(0,0,0,0.8)',

    onPrimary: '#FFFFFF',              // Text/icons on primary
    primaryContainer: '#2F2F2F',       // Container using primary shade
    onPrimaryContainer: '#FFFFFF',     // Text on primary container
    white: '#FFFFFF',
};

// --- Fonts ---
const defaultFonts: ThemeFonts = {
    heading: 'System',
    body: 'System',
    mono: 'Courier',
    weightLight: '300',
    weightRegular: '400',
    weightBold: '700',
    header: 'System',
    bodyBold: 'System',
    subheader: undefined,
    small: undefined
};

// --- Spacing ---
const defaultSpacing: ThemeSpacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

// --- Theme Context ---
interface ThemeContextType {
    isDark: boolean;
    colors: ThemeColors;
    fonts: ThemeFonts;
    spacing: ThemeSpacing;
    toggleTheme: () => void;
    mode: 'light' | 'dark' | 'system';
    setMode: (mode: 'light' | 'dark' | 'system') => void;
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    colors: lightColors,
    fonts: defaultFonts,
    spacing: defaultSpacing,
    toggleTheme: () => { },
    mode: 'light',
    setMode: () => { },
    setThemeMode: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');

    const isDark = (mode === 'dark') || (mode === 'system' && systemColorScheme === 'dark');

    const getCurrentTheme = () => {
        if (mode === 'light') return lightColors;
        if (mode === 'dark') return darkColors;
        return systemColorScheme === 'dark' ? darkColors : lightColors;
    };

    const toggleTheme = () => {
        setMode((prev) =>
            prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'
        );
    };

    const theme: ThemeContextType = {
        isDark,
        colors: getCurrentTheme(),
        fonts: defaultFonts,
        spacing: defaultSpacing,
        toggleTheme,
        mode,
        setMode,
        setThemeMode: () => { }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

// --- Global Styles (you can now use spacing + fonts dynamically) ---
export const globalStyles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    container: {
        flex: 1,
        padding: defaultSpacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: defaultFonts.weightBold as any,
        marginBottom: defaultSpacing.md,
        fontFamily: defaultFonts.heading,
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
});
