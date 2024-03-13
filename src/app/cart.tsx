import { StatusBar } from 'expo-status-bar'
import { View, Text, Platform, FlatList } from 'react-native'
import { useContext} from 'react';
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem';

// Main Cart modal page
const CartScreen = () => {
    const { items } = useCart() // access the chosen items from provider

    return (
        <View>
            {/* Render items added to cart */}
            <FlatList
                data={items}
                renderItem={({item}) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen