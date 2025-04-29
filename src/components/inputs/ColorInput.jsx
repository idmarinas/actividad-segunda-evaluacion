import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";

export default function ColorInput(props) {
    const { pending, ...attrs } = props;
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const form = useForm();

    const handleChange = (event) => form.validateColor(event.target.value, setError, setHelpText, form.setFormValid, setColor);

    return (
        <>
            <TextField
                id="color"
                name="color"
                disabled={pending}
                label="Color"
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