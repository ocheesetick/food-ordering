import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'
import { useOrderDetails } from '@/api/orders'
import { useUpdateOrderSubscription } from '@/api/subscriptions/subscriptions'

const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === "string" ? idString : idString[0])
    const { data: order, error, isLoading } = useOrderDetails(id)

    useUpdateOrderSubscription(id)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if(error || !order) {
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