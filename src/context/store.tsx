"use client";

import {
    createContext,
    useContext,
    useState,
    SetStateAction,
    Dispatch,
    ReactNode,
} from "react";
import { Images } from "../lib/types";

type ContextProps = {
    images: Images;
    setImages: Dispatch<SetStateAction<Images>>;
};

const GlobalContext = createContext<ContextProps>({
    images: {
        thumbnail: "",
        gallery: [],
    },
    setImages: (): Images => ({ thumbnail: "", gallery: [] }),
});

export const GlobalContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [images, setImages] = useState<Images>({
        thumbnail: "",
        gallery: [],
    });
    return (
        <GlobalContext.Provider
            value={{
                images,
                setImages,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
