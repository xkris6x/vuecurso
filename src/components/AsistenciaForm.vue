<template>
    <v-form v-model="valid">
        <v-container>
            <v-layout>
                <v-flex xs12 md4>
                    <v-text-field
                            v-model="asistencia.firstname"
                            :rules="nameRules"
                            :counter="10"
                            label="First name"
                            required></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                    <v-text-field
                            v-model="asistencia.lastname"
                            :rules="nameRules"
                            :counter="10"
                            label="Last name"
                            required></v-text-field>
                </v-flex>

                <v-flex xs12 md4>
                    <v-text-field
                            @keyup.enter="presionarEnter"
                            v-model="asistencia.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>

        <v-btn @click.prevent="save" color="success">Guardar</v-btn>
    </v-form>
</template>

<script>
    export default {
        name: "asistencia-form",
        props: [
            'asistencia'
        ]
    }
</script>

<style scoped>

</style>