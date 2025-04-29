import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";

export default function ModeloInput({ pending }) {
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const form = useForm();

    const handleChange = (event) => form.validateModelo(event.target.value, setError, setHelpText, form.setFormValid, setColor);

    return (
        <>
            <TextField
                id="modelo" 
                name="modelo"
                disabled={pending}
                label="Modelo"
                fullWidth
                required
                error={error}
                color={color}
                helperText={helpText}
                onChange={handleChange}
                onBlur={handleChange}
            />
        </>
    );
}