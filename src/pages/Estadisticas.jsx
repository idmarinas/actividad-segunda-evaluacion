import { Alert, Autocomplete, Card, CardContent, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import Title from "../components/layouts/Title";
import { useVehiculos } from "../contexts/AppContext";
import { useEffect, useState } from "react";

export default function Estadisticas () {
    document.title = "Estadísticas de los coches - Concesionario Coches Mariano";

    const { listado } = useVehiculos();
    const [ filterList, setFilterList ] = useState([]);
    const [ marca, setMarca ] = useState(null);

    const marcas = listado.map((vehiculo) => vehiculo.marca);
    const uniqueMarcas = [...new Set(marcas)];

    useEffect(() => {
        setFilterList(listado);
    }, [listado]);

    const handleChange = (event, value) => {
        setMarca(value);

        if (value) {
            setFilterList(listado.filter((vehiculo) => vehiculo.marca === value));
        } else {
            setFilterList(listado);
        }
    }

    const stats =  {
        total: filterList.length,
        potenciaAvg: (filterList.reduce((acc, vehiculo) => acc + Number(vehiculo.potencia), 0) / filterList.length) || 0,
        min: filterList.reduce((min, vehiculo) => {
            const potencia = Number(vehiculo.potencia);
            min = 0 === min ? potencia : min

            return Math.min(min, potencia);
        }, 0),
        max: filterList.reduce((max, vehiculo) => Math.max(max, Number(vehiculo.potencia)), 0)
    };

    return (
        <>
            <Title title="Estadísticas de los coches" />

            <Paper sx={{ marginBottom: 2, padding: 2 }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                    Filtrar por marca
                </Typography>
                <Autocomplete 
                    options={uniqueMarcas}
                    noOptionsText="No hay marcas disponibles"
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label='Seleccionar marca' /> }
                />
            </Paper>

            <Alert severity="info" sx={{ marginBottom: 2 }}>
                Estadísticas de potencia (CV) para <strong>{stats.total}</strong> {stats.total === 1 ? 'coche' : 'coches'}
                {marca ? ' de la marca' : ' de la base de datos'} <strong>{marca}</strong>
            </Alert>
            
            <Stack 
                direction={{xs: 'column', md: 'row'}} 
                spacing={2} 
                textAlign='center' 
                justifyContent='center' 
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{stats.min?.toLocaleString()} CV</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Potencia mínima</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{stats.potenciaAvg.toLocaleString()} CV</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Potencia media</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{stats.max.toLocaleString()} CV</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Potencia máximo</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </>
    );
}