<template>
    <v-data-table :headers="headers" :items="asistencias" class="elevation-1">
        <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>
                <a href="#">Edit</a>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "AsistenciaTable",
        props: [
            'asistencias'
        ]
    }
</script>

<style scoped>

</style>