import Colors from '@constants/Colors';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Product } from '../types';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Product
}

const ProductListItem = ({ product }: ProductListItemProps) => {
    return (
        <View style={styles.container}>
            {/* 
                resizeMode's default is 'cover' meaning cover the whole area with image
                while 'contain' adjusts itself to see the whole image 
            */}
            <Image 
                source={{ uri: product.image || defaultPizzaImage }} 
                style={styles.image} 
                resizeMode='contain'
            />
            
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
        </View>
    )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 1, // Split equally the space amongst its siblings
        maxWidth: '50%'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold'
    }
});
