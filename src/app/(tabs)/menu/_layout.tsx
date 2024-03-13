import { Stack } from "expo-router";

export default function MenuStack() {
    return( 
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Menu'}} />
            {/* 
                Or go inside the index and put <Stack.Screen options={{ title: 'Menu'}} />
                'name' can be ommitted for you are already inside the file just like in 
                [id].tsx
            */}
        </Stack>
    )
}