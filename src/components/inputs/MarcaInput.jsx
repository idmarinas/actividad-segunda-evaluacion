import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";

export default function MarcaInput({ pending }) {
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const form = useForm();

    const handleChange = (event) => form.validateMarca(event.target.value, setError, setHelpText, form.setFormValid, setColor);

    return (
        <>
            <TextField 
                id="marca"
                name="marca"
                disabled={pending}
                label="Marca"
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