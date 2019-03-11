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
                <td>
                    <a href="#" @click.prevent="openEdit(asistencia)" >edit</a>
                    <a href="#" @click.prevent="destroy(asistencia.id)" >edit</a>
                </td>
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

                <v-card-text >
                    <asistencia-form
                            :asistencia="editAsistencia"
                            @storeUpdate="update"/>
                </v-card-text>

                <v-divider></v-divider>

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {db} from './../firebase'
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
                let vm = this
                db.collection("asistencia").doc(this.editAsistencia.id).set({
                    'first_name': vm.editAsistencia.name,
                    'last_name': vm.editAsistencia.lastname,
                    'email': vm.editAsistencia.email
                });
                alert(this.editAsistencia.name);
            },
            destroy(id){
                db.collection("asistencia").doc(id).delete()
            },
            reset(){
                this.editAsistencia={}
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>