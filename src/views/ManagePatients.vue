<template>
    <div>
        <Header />
        <div class="container mt-5">
          <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Religion</th>
              <th scope="col">Phone</th>
              <th scope="col">address</th>
              <th scope="col">Gender</th>
              <th scope="col">Nik</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient, index in patients" :key="index = index + 1">
              <th scope="row">{{index}}</th>
              <td>{{patient.name}}</td>
              <td>{{patient.religion}}</td>
              <td>{{patient.phone}}</td>
              <td>{{patient.address}}</td>
              <td>{{patient.sex}}</td>
              <td>{{patient.nik}}</td>
              <td>
                <button id="edit" @click.prevent="$router.push( { path: `edit-patient/${patient.id}`} )"><img src="../assets/edit.png" alt=""></button>
                <button id="delete" @click="deleted(patient.id)"><img src="../assets/delete.png" alt=""></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import axios from 'axios'

export default {
  name: 'ManagePatients',
  components: {
    Header
  },
  data () {
    return {
      patients: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/get')
      .then((response) => {
        this.patients = response.data.results
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    deleted (id) {
      axios.delete('http://localhost:8000/api/delete/' + id)
        .then((response) => {
          this.$noty.success(response.data.status.message)
          this.$router.push({ name: 'ListPatient' })
        })
    }
  }
}
</script>

<style>
#edit, #delete {
  width: max-content;
  margin: 0 5px;
}
#edit img, #delete img {
  width: 25px;
}
</style>
