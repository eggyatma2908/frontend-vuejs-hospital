<template>
  <div>
    <Header />
    <div class="home">
      <div class="container mt-4 -mb-4">
        <h1 class="title mb-3">Add Patient</h1>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="validationTooltip01">Name</label>
              <input type="text" class="form-control" id="validationTooltip01" required v-model.trim="$v.name.$model" :class="{ 'is-invalid': validationStatus($v.name) }">
              <div class="invalid-feedback" v-if="!$v.name.required">Field is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="validationTooltip02">Religion</label>
              <input type="text" class="form-control" id="validationTooltip02" required v-model.trim="$v.religion.$model" :class="{ 'is-invalid': validationStatus($v.religion) }">
              <div class="invalid-feedback" v-if="!$v.religion.required">Field is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="validationTooltip03">Phone</label>
              <input type="number" class="form-control" id="validationTooltip03" required v-model.trim="$v.phone.$model" :class="{ 'is-invalid': validationStatus($v.phone) }">
              <div class="invalid-feedback" v-if="!$v.phone.required">Field is required.</div>
              <div class="invalid-feedback" v-if="!$v.phone.minLength">Field must have at least {{ $v.phone.$params.minLength.min }} characters.</div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="validationTooltip04">Address</label>
              <input type="text" class="form-control" id="validationTooltip04" required v-model.trim="$v.address.$model" :class="{ 'is-invalid': validationStatus($v.address) }">
              <div class="invalid-feedback" v-if="!$v.address.required">Field is required.</div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="validationTooltip05">Gender</label>
              <br>
              <form id="select-gender">
                <select class="custom-select" id="validationTooltip05" required v-model.trim="$v.sex.$model" :class="{ 'is-invalid': validationStatus($v.sex) }" v-on:change="addGender">
                  <option selected disabled value="">Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div class="invalid-feedback" v-if="!$v.sex.required">Field is required.</div>
              </form>
            </div>
            <div class="col-md-3 mb-3">
              <label for="validationTooltip06">NIK</label>
              <input type="number" class="form-control" id="validationTooltip06" required v-model.trim="$v.nik.$model" :class="{ 'is-invalid': validationStatus($v.nik) }">
              <div class="invalid-feedback" v-if="!$v.nik.required">Field is required.</div>
              <div class="invalid-feedback" v-if="!$v.nik.minLength">Field must have at least {{ $v.nik.$params.minLength.min }} characters.</div>
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
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      name: '',
      religion: '',
      phone: 0 || '',
      address: '',
      sex: '',
      nik: 0 || ''
    }
  },
  validations: {
    name: { required },
    religion: { required },
    phone: { required, minLength: minLength(12) },
    address: { required },
    sex: { required },
    nik: { required, minLength: minLength(16) }
  },
  methods: {
    validationStatus (validation) {
      return typeof validation !== 'undefined' ? validation.$error : false
    },
    addGender () {
      const genderValue = document.getElementById('select-gender').validationTooltip05.value
      this.sex = genderValue
    },
    addPatient () {
      this.$v.$touch()
      if (this.$v.$pending || this.$v.$error) return
      const input = {
        name: this.name,
        religion: this.religion,
        phone: this.phone,
        address: this.address,
        sex: this.sex,
        nik: this.nik
      }
      const form = new FormData()
      form.append('name', input.name)
      form.append('religion', input.religion)
      form.append('phone', input.phone)
      form.append('address', input.address)
      form.append('sex', input.sex)
      form.append('nik', input.nik)

      axios.post('http://localhost:8000/api/v1/post', form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((response) => {
          this.$noty.success(response.data.status.message)
          this.$router.push({ name: 'ListPatient' })
        })
    }
  }
}
</script>
