
<template>
    <div>
        <Header />
        <div class="container mt-5" style="width:50%">
            <div class="card">
                <div class="card-header">
                    <h1>Data Patient</h1>
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-4">{{patient.name}}</h5>
                    <p class="card-text">Religion : {{patient.religion}}</p>
                    <p class="card-text">NIK : {{patient.nik}}</p>
                    <p class="card-text">Gender : {{patient.sex}}</p>
                    <p class="card-text">Phone Number : {{patient.phone}}</p>
                    <p class="card-text">Address : {{patient.address}}</p>
                    <router-link :to="{ name: 'ListPatient' }" style="display: flex; justify-content: flex-end"><button class="btn btn-primary">Back</button></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import axios from 'axios'

export default {
  name: 'DetailPatient',
  components: {
    Header
  },
  data () {
    return {
      patient: []
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/get/' + this.$route.params.id)
      .then((response) => {
        this.patient = response.data.results[0]
        console.log(this.patient)
      })
  }
}
</script>

<style>

</style>
