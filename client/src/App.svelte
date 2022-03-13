<script>
    const fetchData = async () => {
        const url = `${process.env.BACKEND_HOST}/ping`;
        const result = await fetch(url);
        return await result.json();
    };
    const dataPromise = fetchData();
</script>

<main>
    {#await dataPromise}
        <p>Loading data...</p>
    {:then data}
        <p>{JSON.stringify(data)}</p>
    {:catch error}
        <p style="color: red;">Error occured: {error.message}</p>
    {/await}
</main>
