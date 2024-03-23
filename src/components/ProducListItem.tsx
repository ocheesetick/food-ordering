import Colors from '@constants/Colors';
import { Text, StyleSheet, Image, Pressable } from 'react-native';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductListItemProps = {
    product: Tables<'products'>
}

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments() // To check the location segmented in array
    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <RemoteImage
                    path={ product.image }
                    fallback={ defaultPizzaImage }
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
            </Pressable>
        </Link>
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

/* 
    <Image />
    - resizeMode's default is 'cover' meaning cover the whole area with image
    - while 'contain' adjusts itself to see the whole image 

    asChild
    - lets you combine the actions of two components into one

    href={`/menu/${product.id}`}
    - can skip the (tabs), because DIR/path with parenthesis is optional
*/