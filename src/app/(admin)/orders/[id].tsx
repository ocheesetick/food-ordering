import { FlatList, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'
import { OrderStatusList } from '@/types'
import Colors from '@/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/api/orders'

const OrderDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === "string" ? idString : idString[0])
    const { data: order, error, isLoading } = useOrderDetails(id)
    const { mutate: updateOrder } = useUpdateOrder()

    const updateStatus = (status: string) => {
        updateOrder({id: id, updatedField: {status}})
    }

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
            {/* 
            - This is if you want the <OrderListItem /> to scroll along
            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            /> 
            */}
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListFooterComponent={
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                                <Pressable
                                    key={status}
                                    onPress={() => updateStatus(status)}
                                    style={{
                                        borderColor: Colors.light.tint,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginVertical: 10,
                                        backgroundColor:
                                            order.status === status
                                                ? Colors.light.tint
                                                : 'transparent',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                order.status === status ? 'white' : Colors.light.tint,
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </>

                }
            />
        </View>
    )
}

export default OrderDetailsScreen