import { FlatList, View } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProducListItem';

export default function MenuScreen() {
  return (
    <View>
      {/* <ProductListItem product={products[0]}/>
      <ProductListItem product={products[1]}/> */}
      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductListItem product={item}/>}
      />
    </View>
  );
}