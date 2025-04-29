import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getAllVehiculos } from '../composables/api';

export const VehiculosContext = createContext({});

export const useVehiculos = () => useContext(VehiculosContext);

export const VehiculosProvider = ({ children }) => {
    const [listado, setListado] = useState([]);
    const reloadRef = useRef(true);

    useEffect(() => {
        if (reloadRef.current) {
            reloadRef.current = false;
            fetchVehiculos();
        }
            reloadRef.current = false;
    },[reloadRef]);

    const fetchVehiculos = async () => {
        let vehiculos = await getAllVehiculos();
        setListado(vehiculos);
    };

    return (
        <VehiculosContext.Provider value={{
            listado,
            setListado,
            fetchVehiculos,
        }}>
            {children}
        </VehiculosContext.Provider>
    );
}

export const SnackbarContext = createContext({});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarDuration, setSnackbarDuration] = useState(5000);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const snackbarCreate = (message, severity, duration) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity || 'info');
        setSnackbarDuration(duration || 5000);
        setSnackbarOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ 
            snackbarOpen,
            setSnackbarOpen,
            handleClose,
            snackbarSeverity,
            setSnackbarSeverity,
            snackbarMessage,
            setSnackbarMessage,
            snackbarDuration,
            setSnackbarDuration,
            snackbarCreate
        }}>
            {children}
        </SnackbarContext.Provider>
    );
}