import { ActivityIndicator, FlatList, Text } from 'react-native';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/api/orders';

export default function ArchiveScreen() {
    const { data: orders, error, isLoading } = useAdminOrderList({archived: true})

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch products</Text>
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Archive' }} />
            <FlatList
                data={orders}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <OrderListItem order={item} />}
            />
        </>
    );
}