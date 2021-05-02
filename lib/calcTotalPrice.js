export default function calcTotalPrice(cart) {
    return cart.reduce((acc, cartItem) => {
        if(!cartItem.product) return acc; //products can be deleted but could still be in the cart
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0)
}