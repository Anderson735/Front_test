<!-- src/routes/+page.svelte -->
<script>
    // Aquí puedes agregar lógica si es necesario
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Altura completa de la ventana */
        text-align: center;
    }
    
    h1 {
        margin-bottom: 20px;
    }
    
    .button {
        display: inline-block;
        padding: 15px 30px; /* Espaciado interno */
        margin: 10px; /* Margen entre botones */
        font-size: 18px; /* Tamaño de fuente */
        color: white; /* Color del texto */
        background-color: #007bff; /* Color de fondo del botón */
        border: none; /* Sin borde */
        border-radius: 5px; /* Bordes redondeados */
        text-decoration: none; /* Sin subrayado */
        transition: background-color 0.3s; /* Efecto de transición */
    }
    
    .button:hover {
        background-color: #0056b3; /* Color de fondo en hover */
    }
</style>

<main>
    <h1>Bienvenido a la Plataforma de Comercio Electrónico</h1>
    <a class="button" href="/products">Ver Productos</a>
    <a class="button" href="/orders">Ver Ordenes</a>
</main>
