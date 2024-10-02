<script>
    import { onMount } from 'svelte';
    import { getProducts, updateProduct, deleteProduct, createProduct } from '../../services/productService'; 

    let products = [];
    let error = null;
    let showModal = false;
    let currentProduct = null;
    let successMessage = '';
    let confirmDelete = false;
    let productToDelete = null;
    let showCreateModal = false;
    let newProduct = { name: '', price: 0, stock: 0 };

    onMount(async () => {
        await loadProducts();
    });

    async function loadProducts() {
        try {
            products = await getProducts();
            successMessage = ''; 
        } catch (err) {
            error = 'No se pudieron cargar los productos';
            console.error(err);
        }
    }

    function openModal(product) {
        currentProduct = { ...product }; 
        showModal = true; 
    }

    async function saveChanges() {
        await updateProduct(currentProduct.id, currentProduct);
        successMessage = 'Producto actualizado con éxito'; 
        showModal = false;
        await loadProducts(); 
    }

    function confirmDeleteProduct(productId) {
        confirmDelete = true; 
        productToDelete = productId; 
    }

    async function handleDelete() {
        await deleteProduct(productToDelete);
        confirmDelete = false; 
        await loadProducts(); 
    }

    function cancelDelete() {
        confirmDelete = false; 
        productToDelete = null; 
    }

    function openCreateModal() {
        newProduct = { name: '', price: 0, stock: 0 }; 
        showCreateModal = true; 
    }

    async function createNewProduct() {
        await createProduct(newProduct);
        successMessage = 'Producto creado con éxito';
        showCreateModal = false; 
        await loadProducts(); 
    }
</script>

<main>
    <h1>Productos</h1>

    {#if successMessage}
        <p class="success">{successMessage}</p>
    {/if}
    
    {#if error}
        <p>{error}</p>
    {:else if products.length === 0}
        <p>No hay productos disponibles.</p>
    {:else}
        <div class="header-actions">
            <button class="create-button" on:click={openCreateModal}>Crear Producto</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each products as product (product.id)}
                    <tr>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                            <button on:click={() => openModal(product)}>Actualizar</button>
                            <button on:click={() => confirmDeleteProduct(product.id)}>Eliminar</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    <!-- Botones para navegación -->
    <div class="navigation-buttons">
        <button on:click={() => window.location.href = '/'}>Volver a la Página Principal</button>
        <button on:click={() => window.location.href = '/orders'}>Órdenes</button>
    </div>

    {#if showModal}
        <div class="modal">
            <div class="modal-content">
                <span class="close" on:click={() => (showModal = false)}>&times;</span>
                <h2>Editar Producto</h2>
                <label for="name">Nombre:</label>
                <input type="text" bind:value={currentProduct.name} readonly class="readonly" />
                <label for="price">Precio:</label>
                <input type="number" bind:value={currentProduct.price} required />
                <label for="stock">Cantidad:</label>
                <input type="number" bind:value={currentProduct.stock} required />
                <button class="save-button" on:click={saveChanges}>Guardar Cambios</button>
            </div>
        </div>
    {/if}

    {#if confirmDelete}
        <div class="confirm-modal">
            <div class="confirm-content">
                <h2>¿Estás seguro de que deseas eliminar este producto?</h2>
                <div class="button-container">
                    <button on:click={handleDelete}>Sí, eliminar</button>
                    <button on:click={cancelDelete}>Cancelar</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showCreateModal}
        <div class="modal">
            <div class="modal-content">
                <span class="close" on:click={() => (showCreateModal = false)}>&times;</span>
                <h2>Crear Nuevo Producto</h2>
                <label for="name">Nombre:</label>
                <input type="text" bind:value={newProduct.name} required />
                <label for="price">Precio:</label>
                <input type="number" bind:value={newProduct.price} required />
                <label for="stock">Cantidad:</label>
                <input type="number" bind:value={newProduct.stock} required />
                <button class="save-button" on:click={createNewProduct}>Crear Producto</button>
            </div>
        </div>
    {/if}
</main>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px; 
    }
    th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    button {
        margin-right: 5px;
        padding: 5px 10px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    .header-actions {
        display: flex;
        justify-content: flex-end; /* Alinea el botón a la derecha */
        margin-bottom: 20px; /* Espacio entre el botón y la tabla */
    }
    .modal, .confirm-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-content, .confirm-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 400px; 
        position: relative;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .close {
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        font-size: 20px;
    }
    .success {
        color: green;
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-top: 15px; 
    }
    input {
        width: 100%;
        padding: 8px;
        margin-top: 5px; 
        border: 1px solid #ddd;
        border-radius: 4px; 
    }
    input.readonly {
        background-color: #f0f0f0; 
        cursor: not-allowed; 
    }
    input:focus {
        border-color: #007bff; 
    }
    .save-button {
        display: block; 
        margin-top: 20px; 
        margin-left: auto;
        margin-right: auto;
        padding: 10px 15px; 
        background-color: #007bff;
        color: white; 
        border: none; 
        border-radius: 5px;
        cursor: pointer; 
    }
    .save-button:hover {
        background-color: #0056b3; 
    }

    .navigation-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    
    .navigation-buttons button {
        padding: 10px 20px;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .navigation-buttons button:hover {
        background-color: #5a6268;
    }
    
    h1 {
        display: flex;
        justify-content: center;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 20px; 
        margin-top: 20px;
    }
</style>
