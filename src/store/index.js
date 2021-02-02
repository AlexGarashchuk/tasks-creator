import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    remoteTask(state, task) {
      state.tasks.splice(task, 1);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask(state, {id, description, date}) {
      
      const tasks = state.tasks.concat();
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx];

      const status = new Date(date) > new Date ? 'active' : 'outdated'
      tasks[idx] = {...task, date: date, description: description, status}
      state.tasks = tasks;
      
      localStorage.setItem("tasks", JSON.stringify(state.tasks));

    },
    finishTask(state, id){
      const idx = state.tasks.findIndex(t => t.id === id);
      state.tasks[idx].status = "completed"
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit("createTask", task);
    },
    remoteTask({ commit }, task) {
      commit("remoteTask", task);
    },
    updateTask({commit}, task) {
      commit("updateTask", task);
    },
    finishTask({commit}, id){
      commit("finishTask", id);
    }

  },
  modules: {},
  getters: {
    tasks: (s) => s.tasks,
    taskById: (s) => (id) => s.tasks.find((t) => t.id === id),
  },
});
