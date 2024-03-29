import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { Image, View, Text, StyleSheet, Pressable } from 'react-native'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProducListItem'
import { useState } from 'react'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

// These are the only acceptable types based on typse.ts/PizzaSize
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams() // Returns string type url param
    const { addItem } = useCart()

    const router = useRouter() // alternative to link to go-to a route

    // State that has a PizzaSize as a type
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('S')

    // Find in dummy data products that has same id as param id
    const product = products.find((p) => p.id.toString() === id)

    // Add to cart functionality
    const addToCart = () => {
        // Check product if null
        if (!product) {
            return
        }

        // insert to addItem specific product and size
        addItem(product, selectedSize)

        // go-to route modal /cart screen
        router.push('/cart')
    }

    // Catch if product is empty to use this safely in the following code
    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <View style={styles.container}>

            <Stack.Screen
                options={{
                    title: 'Menu',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }} />

            {/* To customize the current screen */}
            <Stack.Screen options={{ title: product.name }} />

            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default ProductDetailsScreen

/*
    aspectRatio
    -   it instructs the layout system to make the element a square, 
        where the width and height are equal.

    justifyContent
    -   available space will be shared around the items
*/