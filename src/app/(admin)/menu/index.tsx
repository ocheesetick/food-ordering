import { FlatList, Text, ActivityIndicator, View } from 'react-native';
import ProductListItem from '@components/ProducListItem';
import { useProductList } from '@/api/products/index';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList() // Renaming data as product

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <View>
        <Ionicons
          style={{
            alignSelf: 'flex-end',
            marginBottom: 35,
            marginRight: 15
          }}
          name="exit"
          size={50}
          color={Colors.light.tint}
          onPress={() => supabase.auth.signOut()}
        />
      </View>
    </View>
  );
}