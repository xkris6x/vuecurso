<template>
    <div>
        <v-card>
            <v-container fluid grid-list-md>
                <h1>{{ asistencia.firstname }} {{ asistencia.lastname }}</h1>

                <asistencia-form
                        :asistencia="asistencia"
                        @storeUpdate="save" />

                <asistencia-table
                        :headers="headers"
                        :asistencias="asistencias" />

                {{ concadenar }}
            </v-container>
        </v-card>

        <v-snackbar
                v-model="notification.snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="notification.mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="notification.timeout"
                :top="y === 'top'"
                :color="notification.color"
                :vertical="notification.mode === 'vertical'" >

            {{ text }}
            <v-btn color="pink"
                   flat
                   @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>

    </div>
</template>

<script>

    import {db} from './../firebase'
    import AsistenciaForm from './../components/AsistenciaForm'
    import AsistenciaTable, { eventBusAsistencia } from './../components/AsistenciaTable'

    //import { eventBusAsistencia } from './../components/AsistenciaTable'

    export default {
        name: "asistencia",
        components:{
            AsistenciaForm,
            AsistenciaTable
        },
        data: () => ({
            suma: '',
            notification:{
                snackbar: false,
                //y: 'top',
                //x: null,
                mode: '',
                timeout: 6000,
                text: '',
                color:''
            },
            asistencia: {
                name: '',
                lastname: '',
                email: '',
                precio: 0.00,
            },
            asistencias: [],
            headers: [
                {
                    id: 'Id',
                    name: 'Nombres',
                    option: 'Opción'
                },
            ]
        }),
        created(){
            this.show()
            eventBusAsistencia.$on('refresh-asistencia', this.show)
            eventBusAsistencia.$on('refresh-borrado', this.borrar)
        },
        computed:{
            concadenar(){
                let suma = parseInt(this.asistencia.name) + parseInt(this.asistencia.lastname)
                this.suma = suma
                return suma
            },
            /*total(){
                let total=0;
                this.asistencias.forEach((asistencia)=> {
                    total = parseInt(total) + parseInt(asistencia.precio)
                })
                return total;
            }*/
        },
        methods: {
            borrar(copyAsistencia){
                let vm = this
                vm.notification.snackbar = true
                vm.notification.text = "Se elimino correctamente."
                vm.notification.color = "success"

                //buscar el objeto
                let index = this.asistencias.indexOf(copyAsistencia)

                //Borrar del arreglo el objeto
                this.asistencias.splice(index, 1)
            },
            show() {
                let vm = this
                this.asistencias = []
                //console.log(db.collection('asistencia').get());
                db.collection('asistencia').get().then((querySnapshot) => {
                    //let asistenciaArray = []
                    querySnapshot.forEach((doc) => {
                        let asist = doc.data()
                        asist.id = doc.id
                        vm.asistencias.push(asist)
                        //asistenciaArray.push(asist)
                        //console.log(doc.id, ' => ', doc.data())
                    })
                    //this.asistencias = asistenciaArray
                })

            },
            presionarEnter(){
                alert('presiono enter');
            },
            save(){
                let vm = this;
                db.collection('asistencia').add({
                    firstname: vm.asistencia.firstname,
                    lastname: vm.asistencia.lastname,
                    email: vm.asistencia.email,
                    precio: vm.asistencia.precio,
                }).then(function() {
                    vm.notification.snackbar = true
                    vm.notification.text = "Se guardo correctamente."
                    vm.notification.color = "success"
                    vm.show()
                    vm.reset()
                }).catch(function(error) {
                    vm.notification.snackbar = true
                    vm.notification.text = "Hubo un error interno. "+error
                    vm.notification.color = "danger"
                });
            },
            edit() {

            },
            destroy(){

            },
            reset(){
                this.asistencia.firstname=''
                this.asistencia.lastname=''
                this.asistencia.email=''
            }
        }
    }
</script>

<style scoped>

</style>