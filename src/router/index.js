import Vue from 'vue'
import VueRouter from 'vue-router'
import Patient from '../views/Patient.vue'
import ListPatient from '../views/ListPatient.vue'
import DetailPatient from '../views/DetailPatient.vue'
import ManagePatients from '../views/ManagePatients.vue'
import EditPatient from '../views/EditPatient.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Patient',
    component: Patient
  },
  {
    path: '/list-patient',
    name: 'ListPatient',
    component: ListPatient
  },
  {
    path: '/detail-patient/:id',
    name: 'DetailPatient',
    component: DetailPatient
  },
  {
    path: '/manage-patients',
    name: 'ManagePatients',
    component: ManagePatients
  },
  {
    path: '/edit-patient/:id',
    name: 'EditPatient',
    component: EditPatient
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
