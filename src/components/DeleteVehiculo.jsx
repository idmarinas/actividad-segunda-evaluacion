import { Alert, AlertTitle, Button, Grid } from "@mui/material";
import { useSnackbar, useVehiculos } from "../contexts/AppContext";
import { deleteVehiculoAction } from "../composables/api";
import { useState } from "react";
import { Cancel, Delete } from "@mui/icons-material";

export default function DeleteVehiculo({ vehiculo, onClose }) {
    const [ pending, setPending ] = useState(false);
    const { snackbarCreate } = useSnackbar();
    const { fetchVehiculos } = useVehiculos();

    const handleDelete = async () => {
        setPending(true);
        await deleteVehiculoAction(vehiculo.id, snackbarCreate);
        fetchVehiculos();
        onClose();
    }
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
                <Alert variant="outlined" severity="error">
                    <AlertTitle>Eliminar Vehículo</AlertTitle>
                    <p>¿Seguro de que deseas eliminar el vehículo {vehiculo.marca} {vehiculo.modelo}?</p>
                    <p>Esta acción no se puede deshacer.</p>
                </Alert>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} spacing={2} container>
                <Grid size={12}>
                    <Button fullWidth variant="contained" onClick={onClose} disabled={pending} startIcon={<Cancel />}>
                        No, conservar {vehiculo.marca} {vehiculo.modelo}
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Button 
                        fullWidth 
                        color="error" 
                        variant="contained" 
                        loading={pending} 
                        loadingPosition="start"
                        onClick={handleDelete} 
                        startIcon={<Delete />} 
                    >
                        Sí, borrar {vehiculo.marca} {vehiculo.modelo}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};