<template>
    <div>
        <Header />
        <div class="home">
            <div class="container mt-4 -mb-4">
                <h1 class="title mb-3">Edit Patient</h1>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationTooltip01">Name</label>
                    <input type="text" class="form-control" id="validationTooltip01" required v-model.trim="$v.dataPatient.name.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.name) }">
                    <div class="invalid-feedback" v-if="!$v.dataPatient.name.required">Field is required.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                    <label for="validationTooltip02">Religion</label>
                    <input type="text" class="form-control" id="validationTooltip02" required v-model.trim="$v.dataPatient.religion.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.religion) }">
                    <div class="invalid-feedback" v-if="!$v.dataPatient.religion.required">Field is required.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                    <label for="validationTooltip03">Phone</label>
                    <input type="number" class="form-control" id="validationTooltip03" required v-model.trim="$v.dataPatient.phone.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.phone) }">
                    <div class="invalid-feedback" v-if="!$v.dataPatient.phone.required">Field is required.</div>
                    <div class="invalid-feedback" v-if="!$v.dataPatient.phone.minLength">Field must have at least {{ $v.dataPatient.phone.$params.minLength.min }} characters.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationTooltip04">Address</label>
                    <input type="text" class="form-control" id="validationTooltip04" required v-model.trim="$v.dataPatient.address.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.address) }">
                    <div class="invalid-feedback" v-if="!$v.dataPatient.address.required">Field is required.</div>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="validationTooltip05">Gender</label>
                    <br>
                    <form id="select-gender">
                        <select v-if="dataPatient.sex" class="custom-select" id="validationTooltip05" required v-model.trim="$v.dataPatient.sex.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.sex) }" v-on:change="addGender">
                            <option hidden>{{dataPatient.sex}}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div class="invalid-feedback" v-if="!$v.dataPatient.sex.required">Field is required.</div>
                    </form>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="validationTooltip06">NIK</label>
                    <input type="number" class="form-control" id="validationTooltip06" required v-model.trim="$v.dataPatient.nik.$model" :class="{ 'is-invalid': validationStatus($v.dataPatient.nik) }">
                    <div class="invalid-feedback" v-if="!$v.dataPatient.nik.required">Field is required.</div>
                    <div class="invalid-feedback" v-if="!$v.dataPatient.nik.minLength">Field must have at least {{ $v.dataPatient.nik.$params.minLength.min }} characters.</div>
                    </div>
                </div>
                <button class="btn btn-primary" type="submit" @click.prevent="addPatient">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'EditPatient',
  components: {
    Header
  },
  data () {
    return {
      dataPatient: {
        name: '',
        religion: '',
        phone: '',
        address: '',
        sex: '',
        nik: ''
      }
    }
  },
  validations: {
    dataPatient: {
      name: { required },
      religion: { required },
      phone: { required, minLength: minLength(12) },
      address: { required },
      sex: { required },
      nik: { required, minLength: minLength(16) }
    }
  },
  mounted () {
    axios.get('http://localhost:8000/api/v1/get/' + this.$route.params.id)
      .then((response) => {
        this.dataPatient = {
          name: response.data.results[0].name,
          religion: response.data.results[0].religion,
          phone: response.data.results[0].phone,
          address: response.data.results[0].address,
          sex: response.data.results[0].sex,
          nik: response.data.results[0].nik
        }
      })
  },
  methods: {
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    addGender () {
      const genderValue = document.getElementById('select-gender').validationTooltip05.value
      this.dataPatient.sex = genderValue
    },
    addPatient () {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return
      const input = {
        name: this.dataPatient.name,
        religion: this.dataPatient.religion,
        phone: this.dataPatient.phone,
        address: this.dataPatient.address,
        sex: this.dataPatient.sex,
        nik: this.dataPatient.nik
      }

      axios.put('http://localhost:8000/api/put/' + this.$route.params.id, input, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((response) => {
          this.$noty.success(response.data.status.message)
          this.$router.push({ name: 'ListPatient' })
        })
    }
  }
}
</script>

<style>

</style>
