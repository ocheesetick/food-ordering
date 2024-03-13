import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { Link } from 'expo-router';
import { defaultPizzaImage } from './ProducListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/CartProvider';

type CartListItemProps = {
    cartItem: CartItem; // inherit the properties of props from types.ts/CartItem
}; 

// Specific item on the cart
const CartListItem = ({ cartItem }: CartListItemProps) => {
    const { updateQuantity } = useCart();
    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={{ uri: cartItem.product.image || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
            />

            {/* Name and Price */}
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{cartItem.product.name}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
                    <Text>Size: {cartItem.size}</Text>
                </View>
            </View>

            {/* Quantity */}
            <View style={styles.quantitySelector}>
                {/* -1 to quantity */}
                <FontAwesome
                    onPress={() => updateQuantity(cartItem.id, -1)}
                    name="minus"
                    color="gray"
                    style={{ padding: 5 }}
                />
                
                {/* Quantity Count */}
                <Text style={styles.quantity}>{cartItem.quantity}</Text>

                {/* +1 to quantity */}
                <FontAwesome
                    onPress={() => updateQuantity(cartItem.id, 1)}
                    name="plus"
                    color="gray"
                    style={{ padding: 5 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 18,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});

export default CartListItem;

/*
    const CartListItem = ({ cartItem }: CartListItemProps)
    - the props(cartItem) will change depending from the provider

    updateQuantity()
    - changes the "items" in provider
*/