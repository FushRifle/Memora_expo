import 'react-native-reanimated';
import { TamaguiProvider, Theme } from 'tamagui'
import config from './tamagui.config'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainNavigation } from '@/app/MainNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@/styles/ThemeContext'


SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar translucent style="light" />
            <NavigationContainer>
              <MainNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  )
}
