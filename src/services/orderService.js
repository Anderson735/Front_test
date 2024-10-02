const API_URL = 'https://localhost:7092/api/order'; 

export const getOrders = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener pedidos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el pedido');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Error al crear el pedido');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateOrder = async (id, orderData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el pedido');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el pedido');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
