import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({children}){
    //Custom provider to store the state and functionality (updaters) to access via consumer
    const [cartOpen, setCartOpen] = useState(false);

    function toggleCart(){
        setCartOpen(!cartOpen);
    }

    function openCart(){
        setCartOpen(true);
    }

    function closeCart(){
        setCartOpen(false);
    }

    return <LocalStateProvider value={{ cartOpen, toggleCart, openCart, closeCart }}>{children}</LocalStateProvider>

}
//Custom Hook for accessing the cart local state
function useCart() {
    const all = useContext(LocalStateContext);
    return all
}

export { CartStateProvider, useCart };