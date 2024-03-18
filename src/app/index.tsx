import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
    const { session, loading, isAdmin } = useAuth()

    if (loading) {
        return <ActivityIndicator />
    }

    // Check first if signed in, if not redirect to sign-in
    if (!session) {
        return <Redirect href={'/sign-in'} />
    }

    // Already signed in at this stage, check if admin or user
    if (!isAdmin) {
        return <Redirect href={'/(user)'} />
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            {/* Going to (user)/index */}
            <Link href={'/(user)'} asChild> 
                <Button text="User" />
            </Link>
            {/* Going to (admin)/index */}
            <Link href={'/(admin)'} asChild>
                <Button text="Admin" />
            </Link>

            <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
        </View>
    );
};

export default index;