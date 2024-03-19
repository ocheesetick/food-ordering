import { FlatList, Text, ActivityIndicator } from 'react-native';
import ProductListItem from '@components/ProducListItem';
import { useProductList } from '@/api/products/index';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList() // Renaming data as product

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductListItem product={item}/>}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap:10 }}
      />
  );
}