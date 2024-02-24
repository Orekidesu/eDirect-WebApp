


<template>
  <div class=" w-screen h-screen ">
    <section class="h-screen  flex items-center justify-center">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg shadow bg-secondary ">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibol">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          eDirect
        </a>
        <div class="w-full  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6 text-card-foreground" action="" @submit.prevent="handleLogin">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium ">Your
                  email</label>
                <input v-model="email" type="email" name="email" id="email"
                  class=" bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                  placeholder="****@gmail.com">
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium ">Password</label>
                <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                  class=" bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent">
              </div>

              <button type="submit"
                class="w-full bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800">Sign
                in</button>
              <p class="text-sm font-light ">
                Don’t have an account yet? <a href="#" @click.prevent="handleSignup"
                  class="font-medium text-primary-600 hover:underline :text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.no-scroll {
  overflow: hidden;
}

body {
  overflow: hidden;
}
</style>


<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { initFlowbite } from 'flowbite';
import { auth } from '../firebase/init.js';
import Swal from 'sweetalert2';

const router = useRouter();
let email = ref('');
let password = ref('');

const handleLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((credential) => {
      console.log(credential.user);
      router.push({ name: 'dashboard' });
    })
    .catch((_error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password! Please try again.',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        width: '300px',
      });
    });
};

const handleSignup = () => {
  router.push({ name: 'signup' });
};

defineExpose({
  handleLogin,
  handleSignup,
  email,
  password
});

onMounted(() => {
  initFlowbite();
});
</script>