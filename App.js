/* Imports*/
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import RootNavigator from "./src/components/navigation/Index";
import { ThemeProvider } from "styled-components";

const theme = {
  grey: "#eeeeee",
  white: "#ffffff",
  blue: "#5588A3",
};
export default function App() {
  return (
    <NativeBaseProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
