<template>
    <div>
        <v-card>
            <v-container fluid grid-list-md>
                    <h1>{{ asistencia.firstname }} {{ asistencia.lastname }}</h1>

                    <asistencia-form :asistencia="asistencia" ></asistencia-form>
                    <asistencia-table :asistencias="asistencias"></asistencia-table>
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
            valid: false,
            asistencia: {
                firstname: '',
                lastname: '',
                email: '',
            },
            asistencias: [],
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            headers: [
                {
                    text: 'Id',
                    text: 'Nombres',
                    text: 'Opción'
                },
            ]
        }),
        created(){
          this.show()
        },
        methods: {
            show() {
                db.collection('asistencia').get().then((querySnapshot) => {
                    let asistenciaArray = []
                    querySnapshot.forEach((doc) => {
                        let asist = doc.data()
                        asist.id = doc.id
                        asistenciaArray.push(asist)
                        console.log(doc.id, ' => ', doc.data())
                    })
                    this.asistencias = asistenciaArray
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