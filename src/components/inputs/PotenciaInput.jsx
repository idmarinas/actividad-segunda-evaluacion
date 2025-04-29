import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";

export default function PotenciaInput(props) {
    const { pending, ...attrs } = props;
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const form = useForm();

    const handleChange = (event) => form.validatePotencia(event.target.value, setError, setHelpText, form.setFormValid, setColor);

    return (
        <>
            <TextField
                id="potencia"
                name="potencia"
                disabled={pending}
                type="number"
                label="Potencia (CV)"
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