import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../contexts/FormContext";
import { useVehiculos } from "../../contexts/AppContext";

export default function ChasisInput(props) {
    const { pending, id, ...attrs } = props;
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState("");
    const [color, setColor] = useState('');
    const { listado } = useVehiculos();
    const form = useForm();

    const handleChange = (event) => form.validateChasis(event.target.value, setError, setHelpText, form.setFormValid, setColor, id, listado);

    return (
        <>
            <TextField
                id="numChasis"
                name="numChasis"
                disabled={pending}
                type="number"
                label="Chasis"
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