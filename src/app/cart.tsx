import { StatusBar } from 'expo-status-bar'
import { View, Text, Platform, FlatList } from 'react-native'
import { useContext} from 'react';
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

// Main Cart modal page
const CartScreen = () => {
    const { items, total, checkout } = useCart() // access the chosen items from provider

    return (
        <View style={{ padding:10 }}>
            {/* Render items added to cart */}
            <FlatList
                data={items}
                renderItem={({item}) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize:20, fontWeight: 'bold' }}>Total: ${total}</Text>
            <Button onPress={checkout} text="Checkout" />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen