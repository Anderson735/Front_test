const API_URL = 'https://localhost:7092/api/product';

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
