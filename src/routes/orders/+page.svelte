<script>
    import { onMount } from 'svelte';
    import { getOrders, createOrder, updateOrder, deleteOrder } from '../../services/orderService'; 
    import { goto } from '$app/navigation'; // Importa el método goto para la navegación

    let orders = [];
    let error = null;
    let showDetailsModal = false;
    let showCreateModal = false;
    let showEditModal = false;
    let selectedOrder = null;
    let newOrderData = { customerId: '', totalAmount: '', orderDetails: [] };
    let editOrderData = {};
    let successMessage = '';
    let confirmDelete = false;
    let orderToDelete = null;

    onMount(async () => {
        await loadOrders();
    });

    async function loadOrders() {
        try {
            orders = await getOrders();
            successMessage = ''; 
            console.log("Órdenes cargadas:", orders); 
        } catch (err) {
            error = 'No se pudieron cargar las órdenes';
            console.error(err);
        }
    }

    function openDetailsModal(order) {
        selectedOrder = order; 
        showDetailsModal = true; 
        console.log("Orden seleccionada:", selectedOrder);
    }

    function openCreateModal() {
        newOrderData = { customerId: '', totalAmount: '', orderDetails: [] };
        showCreateModal = true;
    }

    async function handleCreate() {
        await createOrder(newOrderData);
        showCreateModal = false; 
        await loadOrders(); 
    }

    function openEditModal(order) {
        editOrderData = { ...order }; 
        showEditModal = true; 
    }

    async function handleEdit() {
        await updateOrder(editOrderData.id, editOrderData);
        showEditModal = false; 
        await loadOrders(); 
    }

    function confirmDeleteOrder(orderId) {
        confirmDelete = true; 
        orderToDelete = orderId; 
    }

    async function handleDelete() {
        await deleteOrder(orderToDelete);
        confirmDelete = false; 
        await loadOrders(); 
    }

    function cancelDelete() {
        confirmDelete = false; 
        orderToDelete = null; 
    }

    function goToProducts() {
        goto('/products'); // Navegar a la página de productos
    }

    function goToHome() {
        goto('/'); // Navegar a la página principal
    }
</script>

<main>
    <h1>Órdenes</h1>

    {#if successMessage}
        <p class="success">{successMessage}</p>
    {/if}

    {#if error}
        <p>{error}</p>
    {:else if orders.length === 0}
        <p>No hay órdenes disponibles.</p>
    {:else}
        <button on:click={openCreateModal}>Crear Orden</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Cliente</th>
                    <th>Fecha de Orden</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each orders as order (order.id)}
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.customerId}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>${order.totalAmount}</td>
                        <td>
                            <button on:click={() => openDetailsModal(order)}>Ver Detalles</button>
                            <button on:click={() => openEditModal(order)}>Editar</button>
                            <button on:click={() => confirmDeleteOrder(order.id)}>Eliminar</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if showDetailsModal}
        <div class="modal">
            <div class="modal-content">
                <span class="close" on:click={() => (showDetailsModal = false)}>&times;</span>
                <h2>Detalles de la Orden</h2>
                <p><strong>ID de la Orden:</strong> {selectedOrder.id}</p>
                <p><strong>ID Cliente:</strong> {selectedOrder.customerId}</p>
                <p><strong>Fecha de Orden:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${selectedOrder.totalAmount}</p>
                <h3>Detalles de la Orden:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID Detalle</th>
                            <th>ID Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each selectedOrder.orderDetails as detail (detail.id)}
                            <tr>
                                <td>{detail.id}</td>
                                <td>{detail.productId}</td>
                                <td>{detail.quantity}</td>
                                <td>${detail.unitPrice}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <div class="button-container">
                    <button on:click={() => (showDetailsModal = false)}>Cerrar</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showCreateModal}
        <div class="modal">
            <div class="modal-content">
                <span class="close" on:click={() => (showCreateModal = false)}>&times;</span>
                <h2>Crear Orden</h2>
                <label>ID Cliente:</label>
                <input type="number" bind:value={newOrderData.customerId} required>
                <label>Total:</label>
                <input type="number" bind:value={newOrderData.totalAmount} required>
                <div class="button-container">
                    <button on:click={handleCreate}>Crear</button>
                    <button on:click={() => (showCreateModal = false)}>Cancelar</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showEditModal}
        <div class="modal">
            <div class="modal-content">
                <span class="close" on:click={() => (showEditModal = false)}>&times;</span>
                <h2>Editar Orden</h2>
                <label>ID Cliente:</label>
                <input type="number" bind:value={editOrderData.customerId} required>
                <label>Total:</label>
                <input type="number" bind:value={editOrderData.totalAmount} required>
                <div class="button-container">
                    <button on:click={handleEdit}>Guardar Cambios</button>
                    <button on:click={() => (showEditModal = false)}>Cancelar</button>
                </div>
            </div>
        </div>
    {/if}

    {#if confirmDelete}
        <div class="confirm-modal">
            <div class="confirm-content">
                <h2>¿Estás seguro de que deseas eliminar esta orden?</h2>
                <div class="button-container">
                    <button on:click={handleDelete}>Sí, eliminar</button>
                    <button on:click={cancelDelete}>Cancelar</button>
                </div>
            </div>
        </div>
    {/if}
    
    <div class="navigation-buttons">
        <button on:click={goToProducts}>Ir a Productos</button>
        <button on:click={goToHome}>Ir a Inicio</button>
    </div>
</main>

<style>
    /* Estilos para la tabla, botones y modales */
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
    .button-container {
        display: flex;
        justify-content: flex-end; 
        margin-top: 20px; 
    }
    .navigation-buttons {
        margin-top: 20px; 
        display: flex;
        justify-content: center; 
    }
</style>
