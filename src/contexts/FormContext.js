import { createContext, useContext, useState } from "react";

export const FormContext = createContext({});

export const useForm = () => useContext(FormContext);

export const FormProvider = ({children}) => {
    const [formValid, setFormValid] = useState(false);

    return (
        <FormContext.Provider value={{ 
            formValid,
            setFormValid,
            validateMarca,
            validateModelo,
            validateChasis,
            validateColor,
            validateFechaFabricacion,
            validatePotencia 
        }}>
            {children}
        </FormContext.Provider>
    );
}

const validateMarca = (v, setError, setHelpText, setInvalid, setColor) => checkNotEmptyOnlyLetters(v, setError, setHelpText, setInvalid, setColor);

const validateModelo = (value, setError, setHelpText, setInvalid, setColor) => {
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
};

const validateChasis = (value, setError, setHelpText, setInvalid, setColor, id, listado) => {
    value = value.trim();

    if (!checkNotEmpty(value, setError, setHelpText, setInvalid)) {
        return false;
    } else if (!/^\d{8}$/.test(value)) {
        setHelpText("El número de chasis debe tener 8 dígitos");

        return;
    } else if (id && listado.length > 0 && listado.some(vehiculo => vehiculo.numChasis === value && vehiculo.id !== id)) {
        setHelpText("El número de chasis ya existe");

        return;
    } else if (id === undefined && listado.length > 0 && listado.some(vehiculo => vehiculo.numChasis === value)) {
        setHelpText("El número de chasis ya existe");

        return;
    }

    setError(false);
    setHelpText(' ')
    setInvalid(true);
    setColor('success');
};

const validateColor = (v, setError, setHelpText, setInvalid, setColor) => checkNotEmptyOnlyLetters(v, setError, setHelpText, setInvalid, setColor);

const validateFechaFabricacion = (value, setError, setHelpText, setInvalid, setColor) => {
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
};

const validatePotencia = (value, setError, setHelpText, setInvalid, setColor) => {
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
};

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
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setHelpText("Solo puede contener letras y espacios");

        return false;
    }

    setError(false);
    setHelpText(' ')
    setInvalid(true);
    setColor('success');

    return true;
}
