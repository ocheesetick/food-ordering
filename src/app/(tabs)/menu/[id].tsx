import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, View, Text, StyleSheet, Pressable } from 'react-native'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProducListItem'
import { useState } from 'react'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { useRouter } from 'expo-router'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams() // Returns string type
    const { addItem } = useCart()

    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

    const product = products.find((p) => p.id.toString() === id)

    const addToCart = () => {
        if(!product) {
            return 
        }
        addItem(product, selectedSize)
        router.push('/cart')
    }

    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <View style={styles.container}>
            {/* To customize the current screen */}
            <Stack.Screen options={{ title: product.name }} />

            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => {setSelectedSize(size)}} 
                        style={[
                            styles.size, 
                            { 
                                backgroundColor: selectedSize === size ? 'gainsboro' : 'white'
                            }
                        ]} 
                        key={size}
                    >
                        <Text 
                            style={[
                                styles.sizeText,
                                {
                                    color: selectedSize === size ? 'black' : 'gray'
                                }
                            ]}
                        >
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text="Add to cart" />
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
        marginTop: 'auto'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10 
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25, // half of the width or height,
        alignItems: 'center', // center item horizontally
        justifyContent: 'center' // center item vertically
    },
    sizeText: {
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