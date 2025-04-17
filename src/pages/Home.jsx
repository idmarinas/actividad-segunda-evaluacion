import { useEffect } from "react"
import { useTitle } from "../contexts/AppContext"
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
import Car from "../components/icons/Car"

export default function Home () {
    const { setTitle } = useTitle()

    useEffect(() => {
        setTitle('Portada')
    })

    return (
        <>
            <Card sx={{ display: 'flex', alignItems: 'center'  }}>
                <Box sx={{ display: 'flex', flex: '1 1 auto' }}>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            Concesionario Coches Mariano
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{ color: 'text.secondary' }} >
                            Tu concesionario de coches de confianza
                        </Typography>
                        <p>
                            Concesionario Coches Mariano es tu mejor opción para encontrar el coche de tus sueños.<br />
                            Ofrecemos una amplia variedad de vehículos, precios competitivos y un servicio al cliente excepcional.<br />
                            Ya sea que estés buscando un coche nuevo o usado, tenemos lo que necesitas.<br />
                            Además, ofrecemos financiación flexible y opciones de leasing para adaptarnos a tu presupuesto.<br />
                            Visítanos hoy y descubre por qué somos el concesionario de coches más confiable de la ciudad.<br />
                            <br />
                            ¡No te olvides de preguntar por nuestras ofertas especiales!<br />
                            <br />
                            ¡Te esperamos!<br />
                            <br />
                            ¡No dudes en contactarnos para más información!<br />
                            ¡Estamos aquí para ayudarte a encontrar el coche perfecto para ti!<br />
                            ¡No pierdas más tiempo buscando en otros lugares!<br />
                            ¡Ven a Concesionario Coches Mariano y encuentra el coche de tus sueños!<br />
                            ¡Estamos seguros de que encontrarás el coche perfecto para ti!<br />
                            <br />
                            ¡No te arrepentirás!
                        </p>
                    </CardContent>
                </Box>
                <CardMedia component={Car} width="300" height="250" strokeWidth="0.5" />
            </Card>
        </>
    )
}
