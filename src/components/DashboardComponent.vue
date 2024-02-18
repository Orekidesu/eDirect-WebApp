<template>
  <div class="flex items-center justify-center my-5 px-20">
    <input v-model="search"
      class="border-3 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      type="search" name="search" placeholder="Search">
    <div class="relative" style=" z-index: 2;">
      <button class="bg-transparent text-blue-500 hover:text-white font-bold rounded" @click="filterOpen = !filterOpen">
        <img src="../assets/filter2.svg" alt="Filter Icon" class="w-8 h-6 ">
      </button>
      <div v-show="filterOpen"
        class="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
            v-for="telecom in telecoms" :key="telecom" @click="selectedTelecom = telecom">
            {{ telecom }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- ================================================ LIST OF CUSTOMERS AREA ================================================  -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-15 overflow-y-auto max-h-screen justify-center">
    <div v-for="(customer, index) in filteredCustomers" :key="index" class="bg-slate-500 rounded-lg p-4 shadow">

      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold">{{ customer.name }}</h2>
        <div class="relative inline-block text-left">
          <button class="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-1 px-2 rounded"
            @click="openIndex = openIndex === index ? null : index" title="edit details">
            <img src="../assets/edit.svg" alt="Edit Icon" class="w-4 h-4">
          </button>
          <div v-show="openIndex === index"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem" @click="editCustomer(index)">Edit</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem" @click="deleteCustomer(index)">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <br>
      <p class="text-gray-200">Contact Number: {{ customer.contactNumber }}</p>
      <p class=" text-gray-200">Network: {{ customer.telecom }}</p>
    </div>
    <div v-if="filteredCustomers.length === 0" class="text-center py-4">
      There's no such customer yet.
    </div>
  </div>
  <!-- ================================================ END LIST OF CUSTOMERS AREA ================================================  -->

  <!-- ================================================  BUTTON  AREA================================================ -->

  <div class="fixed bottom-5 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
    <button @click="toggleModal"
      class="bg-transparent hover:bg-slate-800 dark:hover:bg-slate-800 dark:text-slate-500 hover:text-green-300 font-bold py-1 px-2 rounded">
      <span class="material-symbols-outlined text-3xl sm:text-5xl">
        add_circle
      </span>
    </button>
  </div>

  <!-- ================================================ END  BUTTON  AREA================================================ -->

  <!-- Main modal -->
  <div v-if="showModal" id="authentication-modal" tabindex="-1" aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <!-- ... -->
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingIndex === null ? 'Add Customer' : 'Edit Customer' }}
          </h3>
          <button type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5">
          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
              <input v-model="newCustomer.name" type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter  Name" required />
            </div>
            <div>
              <label for="contactNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                Number</label>
              <input v-model="newCustomer.contactNumber" type="tel" name="contactNumber" id="contactNumber"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="09XXXXXXXXX" required />
            </div>
            <div>
              <label for="telecom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telecom</label>
              <select v-model="newCustomer.telecom" name="telecom" id="telecom"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required>
                <option value="Talk 'N text">Talk 'N text</option>
                <option value="Smart">Smart</option>
                <option value="TM">TM</option>
                <option value="Globe">Globe</option>
                <option value="DITO">DITO</option>
                <!-- Add more options as needed -->
              </select>
            </div>
            <button type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, } from 'vue'
import { initFlowbite } from 'flowbite'
import { computed } from 'vue';

const filterOpen = ref(false);
const telecoms = ref(['Globe', 'Smart', 'TNT', 'TM', 'DITO']);
const showModal = ref(false);
const open = ref(false);
const editingIndex = ref<number | null>(null);
const openIndex = ref<number | null>(null);
const newCustomer = ref({ name: '', contactNumber: '', telecom: '' });
const search = ref('');
const selectedTelecom = ref('');

const editCustomer = (index: number) => {
  newCustomer.value = { ...customers.value[index] };
  editingIndex.value = index;
  toggleModal();
};

const submitForm = () => {
  if (editingIndex.value === null) {
    addCustomer();
  } else {
    updateCustomer();
  }
  open.value = false; // Add this line
  openIndex.value = null;
};

const deleteCustomer = (index: number) => {
  customers.value.splice(index, 1);
};

const customers = ref([
  // Add your customers here
  { name: 'Carl Michael S. Codog', contactNumber: '09078270767', telecom: 'Globe' },
  { name: 'Joshua Falguera', contactNumber: '098-765-4321', telecom: 'Smart' },
  { name: 'Carl Michael S. Codog', contactNumber: '09078270767', telecom: 'Globe' },

]);

const updateCustomer = () => {
  if (editingIndex.value !== null) {
    customers.value[editingIndex.value] = { ...newCustomer.value };
    newCustomer.value = { name: '', contactNumber: '', telecom: '' };
    editingIndex.value = null;
    toggleModal();
  }
};

const addCustomer = () => {
  customers.value.push({ ...newCustomer.value });
  newCustomer.value = { name: '', contactNumber: '', telecom: '' };
  toggleModal();
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const filteredCustomers = computed(() => {
  return customers.value.filter(customer =>
    (!search.value || customer.name.toLowerCase().includes(search.value.toLowerCase()) ||
      customer.contactNumber.includes(search.value) ||
      customer.telecom.toLowerCase().includes(search.value.toLowerCase())) &&
    (!selectedTelecom.value || customer.telecom === selectedTelecom.value)
  );
});


onMounted(() => {
  initFlowbite();
});
</script>