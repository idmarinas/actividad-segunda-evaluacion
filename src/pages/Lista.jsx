import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import Title from "../components/layouts/Title";
import { useState } from "react";
import EditVehiculo from "../components/EditVehiculo";
import { useVehiculos } from "../contexts/AppContext";
import { Delete, Edit } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import DeleteVehiculo from "../components/DeleteVehiculo";

export default function Lista () {
    document.title = "Lista de coches - Concesionario Coches Mariano";
    const { listado } = useVehiculos();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    return (
        <>
            <Title title="Lista de coches" />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.dark" }}>
                            <TableCell />
                            <TableCell sx={{ color: 'white' }}>Marca</TableCell>
                            <TableCell sx={{ color: 'white' }}>Modelo</TableCell>
                            <TableCell sx={{ color: 'white' }}>Chasis</TableCell>
                            <TableCell sx={{ color: 'white' }}>Color</TableCell>
                            <TableCell sx={{ color: 'white' }}>Potencia (CV)</TableCell>
                            <TableCell sx={{ color: 'white' }}>Fecha de Fabricación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? listado.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listado).map((vehiculo) => (
                            <Row key={vehiculo.id} row={vehiculo} />
                        ))}
                        {listado.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <h3>No hay vehículos registrados</h3>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={listado.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setRowsPerPage(parseInt(event.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

function Row({ row }) {
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Tooltip title={'Editar: ' + row.id + ') ' + row.marca + ' ' + row.modelo}>
                        <IconButton 
                            size="small" 
                            aria-label={'Editar: ' + row.id + ') ' + row.marca + ' ' + row.modelo}
                            onClick={() => { setEdit(!edit); setDel(false); }}
                        >
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Eliminar: ' + row.id + ') ' + row.marca + ' ' + row.modelo}>
                        <IconButton 
                            size="small" 
                            aria-label={'Eliminar: ' + row.id + ') ' + row.marca + ' ' + row.modelo}
                            onClick={() => { setDel(!del); setEdit(false); }}
                        >
                            <Delete sx={{color: red[500]}} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{parseInt(row.numChasis).toLocaleString()}</TableCell>
                <TableCell>{row.color}</TableCell>
                <TableCell>{parseInt(row.potencia).toLocaleString()} CV</TableCell>
                <TableCell>{row.fechaFabricacion}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={edit} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <EditVehiculo vehiculo={row} onClose={() => {setEdit(!edit); setDel(false);}} />
                        </Box>
                    </Collapse>
                    <Collapse in={del} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <DeleteVehiculo vehiculo={row} onClose={() => {setDel(!del); setEdit(false);}} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}