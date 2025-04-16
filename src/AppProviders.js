import { useState } from "react";
import { TitleContext } from "./contexts/AppContext";

export default function AppProviders({ children }) {
    const [title, setTitle] = useState('Concesionario Coches Mariano');

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    );
}
