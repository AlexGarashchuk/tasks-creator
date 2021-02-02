<template>
  <md-toolbar class="md-accent md-primary" md-elevation="1">
    <h3 class="md-title" style="flex: 1">Tasks creator</h3>
    <router-link to="/"> <md-button>Create</md-button></router-link>
    <router-link to="/task/:id" exact>
      <md-button class="md-primary">Task</md-button>
    </router-link>
    <router-link to="/list">
      <md-button class="md-primary">List</md-button>
    </router-link>
  </md-toolbar>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>>
