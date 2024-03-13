import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
    return (
        <Stack screenOptions={{
            headerRight: () => (
                <Link href="/cart" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                                name="shopping-cart"
                                size={20}
                                color={Colors.light.tint}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
            ),
        }}>
            <Stack.Screen name="index" options={{ title: 'Menu' }} />
            {/* 
                Or go inside the index and put <Stack.Screen options={{ title: 'Menu'}} />
                'name' can be ommitted for you are already inside the file just like in 
                [id].tsx
            */}
        </Stack>
    )
}