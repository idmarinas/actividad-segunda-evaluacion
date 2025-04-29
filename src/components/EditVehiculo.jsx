import { Button, Grid, Input } from "@mui/material";
import MarcaInput from "./inputs/MarcaInput";
import ModeloInput from "./inputs/ModeloInput";
import ColorInput from "./inputs/ColorInput";
import FechaFabricacionInput from "./inputs/FechaFabricacionInput";
import PotenciaInput from "./inputs/PotenciaInput";
import ChasisInput from "./inputs/ChasisInput";
import { FormProvider, useForm } from "../contexts/FormContext";
import { useState } from "react";
import { Save } from "@mui/icons-material";
import { editVehiculoAction } from "../composables/api";
import { useSnackbar, useVehiculos } from "../contexts/AppContext";

export default function EditVehiculo({ vehiculo, onClose }) {
    return (
        <FormProvider>
            <EditForm vehiculo={vehiculo} onClose={onClose} />
        </FormProvider>
    );
}

function EditForm({ vehiculo, onClose }) {
    const [ pending, setPending ] = useState(false);
    const { fetchVehiculos } = useVehiculos();
    const { snackbarCreate } = useSnackbar();
    const form = useForm();

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
            await editVehiculo(new FormData(event.target), onClose, form.setFormValid, snackbarCreate);
            fetchVehiculos();
        }
        
        setPending(false);
    };

    return (
        <Grid 
            component='form'
            autoComplete="off"
            onSubmit={onSubmit}
            container
            noValidate
            spacing={{ xs: 1, sm: 2 }}
            sx={{ marginTop: 2}}
        >
            <Grid size={6}>
                <Input type='hidden' name='id' defaultValue={vehiculo.id} />
                <MarcaInput pending={pending} defaultValue={vehiculo.marca} />
            </Grid>
            <Grid size={6}>
                <ModeloInput pending={pending} defaultValue={vehiculo.modelo}/>
            </Grid>
            <Grid size={6}>
                <ColorInput pending={pending} defaultValue={vehiculo.color}/>
            </Grid>
            <Grid size={6}>
                <FechaFabricacionInput pending={pending} defaultValue={vehiculo.fechaFabricacion}/>
            </Grid>
            <Grid size={6}>
                <PotenciaInput pending={pending} defaultValue={vehiculo.potencia}/>
            </Grid>
            <Grid size={6}>
                <ChasisInput pending={pending} defaultValue={vehiculo.numChasis} id={vehiculo.id} />
            </Grid>
            <Grid size={12} alignContent='center' justifyContent='center' container spacing={2}>
                <Button variant='contained' onClick={onClose} disabled={pending}>Cancelar</Button>
                <Button 
                    type='submit' 
                    loading={pending} 
                    disabled={!form.formValid} 
                    color='success' 
                    variant='contained'
                    loadingPosition="start"
                    startIcon={<Save />}
                >Guardar</Button>
            </Grid>
        </Grid>
    );
};

const editVehiculo = async (formData, onClose, setFormValid, snackbarCreate) => {

    await editVehiculoAction(Object.fromEntries(formData.entries()), snackbarCreate);

    onClose();
    setFormValid(false);
}