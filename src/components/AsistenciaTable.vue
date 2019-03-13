<template>
    <div>
        <input type="text" >

        <v-text-field
                v-model="search"
        ></v-text-field>

        <table border="1" width="100%">
            <tr>
                <td>nombre</td>
                <td>Email</td>
                <td>Precio</td>
                <td>opciones</td>
            </tr>
            <tr v-for="asistencia in filterAsistencias">
                <td>{{ asistencia.firstname }} {{ asistencia.lastname }}</td>
                <td>{{ asistencia.email }}</td>
                <td>{{ asistencia.precio }}</td>
                <td>
                    <a href="#" @click.prevent="openEdit(asistencia)" >Edit </a>
                    <a href="#" @click.prevent="destroy(asistencia)" >Eliminar </a>
                </td>
            </tr>
            <tr>
                <td colspan="2">Total</td>
                <td> {{ total }}</td>
                <td></td>
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

    import Vue from 'vue'
    export const eventBusAsistencia = new Vue();

    export default {
        name: "asistencia-table",
        eventBusAsistencia,
        components:{
            AsistenciaForm
        },
        data() {
          return{
              search: '',
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
            },
            /*total:{
                default: 0,

            }*/
        },
        computed:{
              total(){
                  let total=0;
                  this.asistencias.forEach((asistencia)=> {
                      total = parseInt(total) + parseInt(asistencia.precio)
                  })
                  return total;
              },
            filterAsistencias(){
                let q = this.search
                return this.asistencias.filter(function(asistencia){
                    if(q != '') {
                        console.log(asistencia.firstname.toString() + ' ' + q)
                        return asistencia.firstname.toString().includes(q)
                    }
                    return true;
                })
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
                    'email': vm.editAsistencia.email,
                    'precio': vm.editAsistencia.precio
                });

                eventBusAsistencia.$emit('refresh-asistencia' /*,arg1, arg2*/);
                alert(this.editAsistencia.name);
            },
            destroy(asistencia){
                alert('Entro al borrado')
                let copyAsistencia = asistencia
                db.collection("asistencia").doc(asistencia.id).delete().then(function() {
                    eventBusAsistencia.$emit('refresh-borrado', copyAsistencia);
                }).catch(function(error) {
                    console.log(error)
                });
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