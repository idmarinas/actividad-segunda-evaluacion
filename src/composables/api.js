const API_URL = "http://localhost:8080/vehiculos.php";

export async function getAllVehiculos() {
    return await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json()).then(data => data);
};

export async function saveVehiculoAction(data, snackbarCreate) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

    }).catch(error => {
        snackbarCreate(error, 'error');
    });

    const json = await response.json();

    if (!response.ok) {
        snackbarCreate(json.error, 'error');
        return;
    } else {
        snackbarCreate(`Vehículo (${json.id}) "${json.marca} ${json.modelo}" añadido correctamente`, 'success');
    }
};

export async function editVehiculoAction(data, snackbarCreate) {
    await new Promise((res) => setTimeout(res, 1000));

    const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

    }).catch(error => {
        snackbarCreate(error, 'error');
    });

    const json = await response.json();

    if (!response.ok) {
        snackbarCreate(json.error, 'error');
        return;
    } else {
        snackbarCreate(`Vehículo (${json.id}) "${json.marca} ${json.modelo}" editado correctamente`, 'success');
    }
}

export async function deleteVehiculoAction(id, snackbarCreate) {
    await new Promise((res) => setTimeout(res, 1000));

    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),

    }).catch(error => {
        snackbarCreate(error, 'error');
    });

    const json = await response.json();

    if (!response.ok) {
        snackbarCreate(json.error, 'error');
        return;
    } else {
        snackbarCreate(json.message, 'success');
    }
};
