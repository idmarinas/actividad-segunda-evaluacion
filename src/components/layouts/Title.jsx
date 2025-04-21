import { colors, Paper, Typography } from "@mui/material";

export default function Title({ title }) {
    return (
        <Paper elevation={0} sx={{ padding: 2, marginBottom: 2, bgcolor: colors.blue[100] }}>
            <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>{title}</Typography>
        </Paper>
    );
}