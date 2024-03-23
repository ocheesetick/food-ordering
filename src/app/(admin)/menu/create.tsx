import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProducListItem'
import Colors from '@/constants/Colors'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'
import { useRouter } from 'expo-router'
import * as FileSystem from'expo-file-system'
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'

// Will also be reused for Update since elements required are same
const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState('')
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === "string" ? idString : idString?.[0])
    const isUpdating = !!id

    const router = useRouter()

    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const { data: productData } = useProduct(id)
    const { mutate: deleteProduct } = useDeleteProduct()

    useEffect(() => {
        if (productData) {
            setName(productData.name)
            setPrice(productData.price.toString())
            setImage(productData.image)
        }
    }, [productData])

    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors("Name is required")
            return false
        }
        if (!price) {
            setErrors("Price is required")
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors("Price is not a number")
            return false
        }
        return true
    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate()
        } else {
            onCreate()
        }
    }

    const onCreate = async () => {
        if (!validateInput()) {
            return
        }

        const imagePath = await uploadImage()

        // Save in the database
        insertProduct({ name, price: parseFloat(price), image: imagePath }, {
            onSuccess: () => {
                resetFields()
                router.back()
            }
        })

        console.warn('Creating Product', name)

    }

    const onUpdateCreate = async () => {
        if (!validateInput()) {
            return
        }

        const imagePath = await uploadImage()

        // Save in the database
        updateProduct({ id, name, image: imagePath , price: parseFloat(price) }, {
            onSuccess: () => {
                resetFields()
                router.back()
            }
        })
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields()
                router.replace('/(admin)/menu')
            }
        })
        console.warn("DELETE!")
    }


    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        if (data) {
            return data.path;
        }
    };

    return (
        <View style={styles.container}>
            {/* The only way to know if update is if there is a product id being passed */}
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />

            <Image
                source={{ uri: image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />


            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // To make sure page expands to the whole screen
        justifyContent: 'center',
        padding: 10
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 20
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    }
})

export default CreateProductScreen