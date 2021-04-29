import Link from 'next/link'
import React from 'react'
import useUser from '../lib/Hooks/useUser';
import NavStyles from './styles/NavStyles';

const Nav = () => {
    const user = useUser();

    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/accounts">Accounts</Link>
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
