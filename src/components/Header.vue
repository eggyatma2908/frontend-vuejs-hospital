<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="container">
                    <router-link class="navbar-brand text-light" :to="{ name: 'Patient' }" >HOSPITAL</router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <router-link :to="{ name: 'Patient' }" class="nav-link text-light">Add Patient</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'ListPatient' }" class="nav-link text-light">List Patient</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'ManagePatients' }" class="nav-link text-light">Manage Patients</router-link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
