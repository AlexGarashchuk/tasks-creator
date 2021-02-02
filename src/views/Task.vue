<template>
  <div>
    <div v-if="task">
      <h1>{{ task.title }}</h1>
      <form class="md-layout">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <div>
                  <md-chips v-model="task.tegs" md-placeholder="Task tegs...">
                  </md-chips>
                </div>
                <md-field>
                  <label>Description</label>
                  <md-textarea
                    v-model="description"
                    id="description"
                    maxlength="2048"
                  ></md-textarea>
                </md-field>
                <md-datepicker v-model="date">
                  <label>Select date</label>
                </md-datepicker>
                <div class="btn-wrp" v-if='task.status !=="completed"'>
                  <md-button @click="submitHandler" class="btn md-accent"
                    >Update</md-button
                  >
                  <md-button class="btn md-primary" @click="finishTask">Finish task</md-button>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </form>
    </div>
    <p v-else>task no found</p>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data: () => ({
    description: "",
    date: null,
    chips: null,
  }),

  mounted() {
    this.description = this.task.description || this.task.message;
    this.date = new Date(this.task.date);
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date
      })
      this.$router.push("/list")
    },
    finishTask() {
      this.$store.dispatch('finishTask', this.task.id)
      this.$router.push("/list")
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-wrp {
  display: flex;
  justify-content: flex-end;
}
.btn {
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
}

.btn-update {
  background: #a5c6b1;
}
.btn-finish {
  background: #a5c6b1;
}
</style>
