<template>
  <div>
    <div v-if="tasks.length" class="md-list">
      <md-table
        v-model="tasks"
        md-sort="name"
        md-sort-order="asc"
        md-card
        md-fixed-header
      >
        <md-table-toolbar>
          <h1 class="md-title">List</h1>
        </md-table-toolbar>

        <md-table-row
          slot="md-table-row"
          v-for="(item, index) in tasks"
          :key="item.id"
        >
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
            index + 1
          }}</md-table-cell>
          <md-table-cell md-label="Description" md-sort-by="name">{{
            item.title
          }}</md-table-cell>
          <md-table-cell
            class="text"
            md-label="Description"
            md-sort-by="name"
            >{{ item.message || item.description }}</md-table-cell
          >
          <md-table-cell md-label="Date" md-sort-by="email">{{
            new Date(item.date).toLocaleDateString()
          }}</md-table-cell>
          <md-table-cell md-label="Status" md-sort-by="gender">{{
            item.status
          }}</md-table-cell>
          <md-table-cell md-sort-by="title">
            <div class="actions">
              <md-button
                v-on:click="remoteTask(index)"
                class="md-icon-button md-accent"
              >
                <md-icon>delete</md-icon>
              </md-button>
              <router-link class="btn btn-small" :to="'/task/' + item.id">
                <md-button class="md-raised md-primary">Open</md-button>
              </router-link>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  name: "Controls",

  // data: () => ({
  //   description: "",
  //   date: null,
  //   chips: null,
  // }),

  // mounted() {
  //   this.description = this.tasks.description || this.task.message;
  //   this.date = new Date(this.tasks.date);
  // },

  methods: {
    remoteTask: function(id) {
      this.$store.dispatch("remoteTask", id);
    },
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 100%;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}
.actions {
  display: flex;
}
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px;
}
</style>
