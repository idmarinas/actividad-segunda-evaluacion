import { createContext } from "react";

const checkNotEmpty = (value, setError, setHelpText, setInvalid) => {
    setError(true);
    setInvalid(false);

    if (value.length < 1) {
        setHelpText("Campo requerido");

        return false;
    }

    return true;
}

const checkNotEmptyOnlyLetters = (value, setError, setHelpText, setInvalid, setColor) => {
    value = value.trim();

    if (!checkNotEmpty(value, setError, setHelpText, setInvalid)) {
        return false;
    } else if (!/^[a-zA-Z]+$/.test(value)) {
        setHelpText("Solo puede contener letras y espacios");

        return false;
    }

    setError(false);
    setHelpText(' ')
    setInvalid(true);
    setColor('success');

    return true;
}

const ValidationContext = createContext({
    validateMarca: (v, setError, setHelpText, setInvalid, setColor) => checkNotEmptyOnlyLetters(v, setError, setHelpText, setInvalid, setColor),
    validateModelo: (value, setError, setHelpText, setInvalid, setColor) => {
        value = value.trim();
        
        if (!checkNotEmpty(value, setError, setHelpText, setInvalid)) {
            return false;
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
            setHelpText("El modelo solo puede contener letras, números y espacios");

            return false;
        }

        setError(false);
        setHelpText(' ')
        setInvalid(true);
        setColor('success');
    },
    validateChasis: (value, setError, setHelpText, setInvalid, setColor) => {
        value = value.trim();

        if (!checkNotEmpty(value, setError, setHelpText, setInvalid)) {
            return false;
        } else if (!/^\d{8}$/.test(value)) {
            setHelpText("El número de chasis debe tener 8 dígitos");

            return;
        }

        setError(false);
        setHelpText(' ')
        setInvalid(true);
        setColor('success');
    },
    validateColor: (v, setError, setHelpText, setInvalid, setColor) => checkNotEmptyOnlyLetters(v, setError, setHelpText, setInvalid, setColor),
    validateFechaFabricacion: (value, setError, setHelpText, setInvalid, setColor) => {
        value = value.trim();

        if (!checkNotEmpty(value, setError, setHelpText, setInvalid, setColor)) {
            return false;
        }

        const fechaActual = new Date();
        const fechaInput = new Date(value);

        if (fechaInput > fechaActual) {
            setHelpText("La fecha de fabricación no puede ser mayor a la fecha actual");

            return;
        }

        setError(false);
        setHelpText(' ')
        setInvalid(true);
        setColor('success');
    },
    validatePotencia: (value, setError, setHelpText, setInvalid, setColor) => {
        value = value.trim();

        if (!checkNotEmpty(value, setError, setHelpText, setInvalid)) {
            return false;
        } else if (!/^\d+$/.test(value)) {
            setHelpText("Solo puede contener números enteros positivos");

            return;
        } else if (value < 50) {
            setHelpText("La potencia mínima es 50 CV");

            return;
        }

        setError(false);
        setHelpText(' ')
        setInvalid(true);
        setColor('success');
    },
});



export default ValidationContext;