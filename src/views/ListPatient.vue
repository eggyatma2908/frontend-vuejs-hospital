<template>
    <div>
        <Header />
        <div class="container mt-5">
          <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">address</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient, index in patients" :key="index = index + 1">
              <th scope="row">{{index}}</th>
              <td>{{patient.name}}</td>
              <td>{{patient.phone}}</td>
              <td>{{patient.address}}</td>
              <router-link :to="{ path: `detail-patient/${patient.id}` }"><td><button class="mt-1">view</button></td></router-link>
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
  name: 'ListPatient',
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
