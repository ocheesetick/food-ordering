import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

const _layout = () => {
    const { session } = useAuth()

    // Check if already signed in, if yes redirect inside
    if (session) {
        return <Redirect href={'/'} />
    }

    return (
        <Stack />
    )
}

export default _layout