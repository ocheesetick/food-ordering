import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'

const OrderDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const order = orders.find((o) => o.id.toString() === id)

    if(!order) {
        return <Text>Order not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            <OrderListItem order={order} />
            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            {/* 
            - This is if you want the <OrderListItem /> to scroll along
            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            /> 
            */}
        </View>
    )
}

export default OrderDetailsScreen