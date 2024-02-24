<template>
  <div class="w-screen h-screen">
    <section class="h-screen flex items-center justify-center">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto border rounded-lg shadow bg-secondary text-secondary-foreground ">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          eDirect
        </a>
        <div class="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="" @submit.prevent="handleSignup">
              <div>
                <label for="username" class="block mb-2 text-sm font-medium">Username</label>
                <input v-model="username" type="text" name="username" id="username"
                  class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                  placeholder="Username">
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-mediu ">Your email</label>
                <input v-model="email" type="email" name="email" id="email"
                  class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                  placeholder="****@gmail.com">
              </div>
              <div>
                <label for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                  class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent">
              </div>
              <button type="submit"
                class="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                up</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="#" @click.prevent="handleLogin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { initFlowbite } from 'flowbite';
import { auth } from '../firebase/init.ts';
import Swal from 'sweetalert2';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase/init.ts';

const router = useRouter();
let username = ref('');
let email = ref('');
let password = ref('');

const handleSignup = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((credential) => {
      // Save user details in Firestore
      setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        email: email.value,
        username: username.value
      }).then(() => {
        console.log('User details saved in Firestore');
        router.push({ name: 'dashboard' });
      }).catch((error) => {
        console.error('Error saving user details in Firestore: ', error);
      });
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already in use!',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          width: '300px',
        });
      } else {
        console.log(error.message);
      }
    });
};
const handleLogin = () => {
  router.push({ name: 'login' });
};

defineExpose({
  handleSignup,
  handleLogin,
  username,
  email,
  password
});

onMounted(() => {
  initFlowbite();
});
</script>

<style>
.no-scroll {
  overflow: hidden;
}

body {
  overflow: hidden;
}
</style>