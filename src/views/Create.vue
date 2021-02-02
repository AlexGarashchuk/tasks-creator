<template>
  <div>
    <form class="md-layout" @submit.prevent="preventFunc">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input
                  name="titlte"
                  id="title"
                  autocomplete="given-name"
                  v-model="form.title"
                  required
                />
                <span>{{error.message}}</span>
               
              </md-field>
              <div>
                <md-chips v-model="form.tegs" md-placeholder="Task tegs...">
                </md-chips>
              </div>

              <md-field>
                <label>Description</label>
                <md-textarea
                  v-model="form.description"
                  maxlength="2048"
                ></md-textarea>
              </md-field>
              <md-datepicker v-model="form.selectedDate">
                <label>Select date</label>
              </md-datepicker>
              <div class="btn">
                <span @click="submitHandler">Create</span>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      title: null,
      description: null,
      tegs: [],
      selectedDate: new Date(),
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    error: {
      message: null
    }
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
      },
      tegs: false,
      textarea: required,
      minLength: minLength(3),
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    submitHandler(e) {
      if (this.form.title) {
        const task = {
          title: this.form.title,
          date: this.form.selectedDate,
          tegs: this.form.tegs,
          description: this.form.description,
          status: "active",
          id: Date.now(),
        };
        this.$store.dispatch("createTask", task);
        this.$router.push("/list");
        this.clearForm();
      }else {
       this.error.message = "Field is required"
      }
    },
    preventFunc() {
      return;
    },
    clearForm() {
      this.$v.$reset();
      this.form.title = null;
      this.form.tegs = [];
      this.form.description = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.btn span {
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  background: #458aff;
}
</style>
