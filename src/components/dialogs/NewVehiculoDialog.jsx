import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from "@mui/material";
import { saveVehiculoAction } from "../../composables/api";
import MarcaInput from "../inputs/MarcaInput";
import ModeloInput from "../inputs/ModeloInput";
import ChasisInput from "../inputs/ChasisInput";
import PotenciaInput from "../inputs/PotenciaInput";
import FechaFabricacionInput from "../inputs/FechaFabricacionInput";
import ColorInput from "../inputs/ColorInput";
import { FormProvider, useForm } from "../../contexts/FormContext";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar, useVehiculos } from "../../contexts/AppContext";
import { Cancel } from "@mui/icons-material";

export default function NewVehiculoDialogForm({open, onClose}){
    return (
        <Dialog open={open} onClose={onClose}>
            <FormProvider>
                <NewVehiculoDialog onClose={onClose} />
            </FormProvider>
        </Dialog>
    );
}

function NewVehiculoDialog({ onClose }) {
    const [ pending, setPending ] = useState();
    const { fetchVehiculos } = useVehiculos();
    const form = useForm();
    const { snackbarCreate } = useSnackbar();

    const onSubmit = async (event) => {
        event.preventDefault();
        setPending(true);
        
        // Validar el formulario
        Array.from(event.target.elements).forEach((input) => {
            if (input.name) {
                input.focus();
                input.blur();

                if (!form.formValid) {
                    form.setFormValid(false);
                }
            }
        });

        // Puedes también verificar si el formulario es válido antes de enviarlo
        if (event.target.checkValidity() && form.formValid) {
            await saveNewVehiculo(new FormData(event.target), onClose, form.setFormValid, snackbarCreate);
            fetchVehiculos();
        }
        
        setPending(false);
    };

    return (
        <form autoComplete="off" noValidate onSubmit={onSubmit}>
            <DialogTitle textAlign='center'>
                <CircularProgress size="20px" sx={{visibility: pending ? 'visible' : 'hidden' }} /> Añadir Vehículo</DialogTitle>
            <DialogContent>
                <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ marginTop: 2}} disabled={pending}>
                    <Grid size={6}>
                        <MarcaInput pending={pending} />
                    </Grid>
                    <Grid size={6}>
                        <ModeloInput pending={pending} />
                    </Grid>
                    <Grid size={6}>
                        <ColorInput pending={pending} />
                    </Grid>
                    <Grid size={6}>
                        <FechaFabricacionInput pending={pending} />
                    </Grid>
                    <Grid size={6}>
                        <PotenciaInput pending={pending} />
                    </Grid>
                    <Grid size={6}>
                        <ChasisInput pending={pending} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={onClose} disabled={pending} startIcon={<Cancel />}>Cancelar</Button>
                <Button 
                    type='submit' 
                    loading={pending} 
                    disabled={!form.formValid} 
                    color='success' 
                    variant='contained'
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                >Añadir</Button>
            </DialogActions>
        </form>
    );
}

const saveNewVehiculo = async (formData, onClose, setFormValid, snackbarCreate) => {

    await saveVehiculoAction(Object.fromEntries(formData.entries()), snackbarCreate);

    onClose();
    setFormValid(false);
}

/*
a. Id de vehículo. Es un dato interno que no se muestra al usuario, solo se usa en 
operaciones de servidor y de obtención de datos. 
b. Número de chasis. 
c. Marca del vehículo. 
d. Modelo del vehículo. 
e. Color 
f. Potencia (en CV) 
g. Fecha de fabricación 
*/