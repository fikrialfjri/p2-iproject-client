import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://spartan-id.herokuapp.com"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSparrings: [],
    messages: []
  },
  mutations: {
    Set_UserSparrings(state, payload) {
      state.userSparrings = payload;
    },
    Push_Message(state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
    registerForm(context, payload) {
      const config = {
        method: "post",
        url: `${baseUrl}/register`,
        data: payload
      }

      axios(config)
        .then(() => {
          router.push("/login");

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Register successfully",
          });
        })
        .catch(err => {
          const errors = err.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors,
          });
        })
    },
    loginForm(context, payload) {
      const config = {
        method: "post",
        url: `${baseUrl}/login`,
        data: payload,
      };

      axios(config)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          // commit("SET_NAVIGATION");
          router.push("/");

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
        })
        .catch((err) => {
          const errors = err.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors,
          });
        });
    },
    signOut() {
      localStorage.clear();
      router.push("/login");
    },
    fetchUserSparrings({ commit }) {
      const config = {
        method: "get",
        url: `${baseUrl}/user-sparrings`,
        headers: {
          access_token: localStorage.access_token
        }
      };

      axios(config)
        .then((res) => {
          commit("Set_UserSparrings", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
