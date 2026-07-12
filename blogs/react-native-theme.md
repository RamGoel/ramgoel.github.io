---
title: Light and Dark Mode in React Native
date: 2024-12-29
---

I've recently built a react-native app using expo and implemented a way to use light and dark mode theme in the app. This may not be the most optimized way but right now I feel it's a good and easy way.

I am assuming you're using a state management library, I am using Zustand, you can replicate this with whatever library you're using.

# Defining the Colors

For setting up theme in our app, we'll first need to define all the colors we are going to use in our app, for both dark and light mode. We have created a function named `getColors` which receive the current theme and return colors according to the theme.

```tsx
import { useTheme } from '@/hooks/useTheme'

export const getColors = () => {
    const theme = useTheme.getState().theme
    if (theme === 'light') {
        return {
            primary: '#ffffff',
            secondary: '#f0f0f0',
            button: '#f4c752',
            buttonText: '#000000',
            text: '#000000',
            secondaryText: '#939393',
        }
    } else {
        return {
            primary: '#141c25',
            secondary: '#29384c',
            button: '#f4c752',
            buttonText: '#000000',
            text: '#ffffff',
            secondaryText: '#CBD5E1',
        }
    }
}
```

# Setting up the useTheme Hook

Now, we'll need to setup the useTheme hook (store in Redux, or a custom hook), so that the user can toggle the theme using a button, and we can access the current theme. Also we have a useColors function that'll give us the colors we want to use according to the theme.

```tsx
import { getColors } from '@/constants/constants'
import { create } from 'zustand'

export const useTheme = create<{
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
}>((set, get) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
}))
```

# Using in Components

We have most of the stuff ready, and now we have to use it into our components, for that we'll create a `index.tsx` file where we'll write a simple screen which looks like this. It has simple heading, subtext, and a background. We also have a toggle which we can use to toggle the theme. We want that the text should be black and background should be white when we turn into light mode.

```tsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getColors } from '@/constants/constants'

const generateStyles = () => {
    const COLORS = getColors()
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: COLORS.primary,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.text,
        },
        subtitle: {
            fontSize: 16,
            color: COLORS.secondaryText,
        },
    })
}

// ===========

const HomeScreen = () => {
    const styles = generateStyles()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi, Ram Goel!</Text>
            <Text style={styles.subtitle}>
                Level up your habits every day 🎮
            </Text>
        </View>
    )
}

export default HomeScreen
```

The code after the //===== seems familiar right? It's a basic react component. But what's the generateStyles function.

Well we've created a generateStyles function so we can generate the styles according to our theme. Remeber we had a getColors function that returned colors according to theme? We will use that function here to grab the colors according to theme, and use them in constructing the stylesheet.

Then, we call the function in our component to use the generated styles in our app.

Final Result:

![light mode](https://cdn-images-1.medium.com/max/1000/1*-216gYqQNmTdS0X7cg-iOg.gif)
