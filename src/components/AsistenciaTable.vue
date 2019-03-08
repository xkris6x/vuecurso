<template>
    <div>
        <!--<v-data-table :headers="headers" :items="asistencias" class="elevation-1">
            <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>
                    <a href="#">Edit</a>
                </td>
            </template>
        </v-data-table>-->

        <table width="100%">
            <tr>
                <td>id</td>
                <td>nombre</td>
                <td>opciones</td>
            </tr>
            <tr v-for="asistencia in asistencias">
                <td>{{ asistencia.id }}</td>
                <td>{{ asistencia.firstname }}</td>
                <td><a href="#" @click.prevent="openEdit(asistencia)" >edit</a></td>
            </tr>
        </table>

        <v-dialog
                v-model="dialog"
                width="500">
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    Privacy Policy
                </v-card-title>

                <v-card-text>
                    <asistencia-form
                            :asistencia="editAsistencia"
                            @store="update"/>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                    >
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

    import AsistenciaForm from './../components/AsistenciaForm'

    export default {
        name: "asistencia-table",
        components:{
            AsistenciaForm
        },
        data() {
          return{
              dialog: false,
              editAsistencia: {}
          }
        },
        props: {
            asistencias:{
                type: Array
            },
            headers:{
                type:Array
            }
        },
        methods:{
            openEdit(asistencia){
                this.dialog = true
                this.editAsistencia = asistencia
            },
            update(){
                alert(this.editAsistencia.name);
            }
        }
    }
</script>

<style scoped>

</style>