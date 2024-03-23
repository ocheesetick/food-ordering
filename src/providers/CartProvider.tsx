import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";

type Product = Tables<'products'>

// Create type for context
type CartType = {
    items: CartItem[] // array holds all the CartItem objects
    addItem: (product: Product, size: CartItem['size']) => void // function(product, size)
    updateQuantity: (itemId: string, amount: -1 | 1) => void // function(itemId, amount)
    total: number,
    checkout: () => void
}

// Context that has a type of CartType
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]) // items state that has CartItem as type
    const { mutate: insertOrder } = useInsertOrder() // use the order insertion from api
    const { mutate: insertOrderItems } = useInsertOrderItems()

    const router = useRouter()

    // Add item for Add-to-Cart
    const addItem = (product: Product, size: CartItem['size']) => {
        // Check if chosen product and size is EXISTING and return it
        const existingItem = items.find((item) => item.product === product && item.size === size)

        // IF chosen already EXISTS, add quantity only
        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }

        //ELSE IF new item
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        // Add newCartItem and spread/append the existing items
        setItems([newCartItem, ...items])
    }

    // Update Quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        // set items state
        console.log("Before update", items)
        setItems(
            items.map((item) =>
                item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }
            ).filter((item) => item.quantity > 0) // Return only quantity >= 1
        )
        console.log("AFTER update", items)
    }

    const clearCart = () => {
        setItems([])
    }

    const checkout = () => {
        insertOrder( { total }, { onSuccess: saveOrderItems })
    }

    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size
        }))
        console.log(orderItems)

        insertOrderItems(orderItems, {
            onSuccess() {
                clearCart()
                router.push(`/(user)/orders/${order.id}`)
            }
        })
    }

    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity),
        0
    )

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContext)