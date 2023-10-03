import { createContext } from "react";

export const ThemeContext = createContext();
export const LocaleContext = createContext();
export const ThemeProvider = ThemeContext.Provider;
export const LocaleProvider = LocaleContext.Provider;