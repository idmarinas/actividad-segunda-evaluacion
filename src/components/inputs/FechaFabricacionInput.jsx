import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";

export default function FechaFabricacionInput(props) {
    const { pending, ...attrs } = props;
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const form = useForm();

    const handleChange = (event) => form.validateFechaFabricacion(event.target.value, setError, setHelpText, form.setFormValid, setColor);

    return (
        <>
            <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                id="fechaFabricacion"
                name="fechaFabricacion"
                disabled={pending}
                type="date"
                label="Fecha de fabricación"
                fullWidth
                required
                error={error}
                color={color}
                helperText={helpText}
                onChange={handleChange}
                onBlur={handleChange}
                {...attrs}
            />
        </>
    );
}