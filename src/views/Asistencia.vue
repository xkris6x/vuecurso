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

            </v-container>
        </v-card>
    </div>
</template>

<script>

    import {db} from './../firebase'
    import AsistenciaForm from './../components/AsistenciaForm'
    import AsistenciaTable from './../components/AsistenciaTable'

    export default {
        name: "asistencia",
        components:{
            AsistenciaForm,
            AsistenciaTable
        },
        data: () => ({
            asistencia: {
                name: '',
                lastname: '',
                email: '',
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
        },
        methods: {
            show() {
                let vm = this
                console.log(db.collection('asistencia').get());
                db.collection('asistencia').get().then((querySnapshot) => {
                    let asistenciaArray = []
                    querySnapshot.forEach((doc) => {
                        let asist = doc.data()
                        asist.id = doc.id
                        vm.asistencias.push(asist)
                        //asistenciaArray.push(asist)
                        console.log(doc.id, ' => ', doc.data())
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
                });
                //this.push(this.asistencia)
                this.show()
                this.reset()
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