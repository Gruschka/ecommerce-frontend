import Link from 'next/link'
import React from 'react'
import { useCart } from '../lib/cartState';
import useUser from '../lib/Hooks/useUser';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';

const Nav = () => {
    const user = useUser();
    const { openCart } = useCart();

    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/accounts">Accounts</Link>
                    <SignOut />
                    <button type="button" onClick={openCart}>
                        My Cart
                        <CartCount count={user.cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)} />
                    </button>
                </>
            )}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                </>
            )}
        </NavStyles>
    )
}

export default Nav
