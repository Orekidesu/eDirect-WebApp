<template>
  <!-- <div class="flex items-center justify-center my-5 px-20"> -->

  <div class="flex items-center justify-center my-5">
    <input v-model="search"
      class="border-3 border-gray-300 bg-white text-black h-10  rounded-lg text-sm focus:outline-none" type="search"
      name="search" placeholder="Search">
    <div class="relative" style=" z-index: 2;">
      <button class="bg-transparent text-blue-500 hover:text-white font-bold rounded" @click="filterOpen = !filterOpen">
        <img src="../assets/filter2.svg" alt="Filter Icon" class="w-8 h-6">
      </button>
      <div v-show="filterOpen"
        class="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
            v-for="telecom in telecoms" :key="telecom" @click="selectedTelecom = telecom; filterOpen = false">
            {{ telecom }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- ================================================ LIST OF CUSTOMERS AREA ================================================  -->
  <div v-if="isLoading" class="flex justify-center items-center pt-10">
    <div class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 dark:border-white border-slate-900"></div>
  </div>
  <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-15 overflow-y-auto max-h-screen justify-center">
    <div v-for="(customer, index) in filteredCustomers" :key="index" class="bg-slate-500 rounded-lg p-4 shadow">

      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl text-white font-bold">{{ customer.name }}</h2>
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
      <p class="text-gray-200">Contact Number: {{ customer.contact_number }}</p>
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
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center flex  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
              <label for="contact_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                Number</label>
              <input v-model="newCustomer.contact_number" type="tel" name="contact_number" id="contact_number"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="09XXXXXXXXX" required />
            </div>
            <div>
              <label for="telecom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telecom</label>
              <select v-model="newCustomer.telecom" name="telecom" id="telecom"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required>
                <!-- <option value="All">All</option> -->
                <option value="Talk N text">TNT</option>
                <option value="Smart">Smart</option>
                <option value="TM">TM</option>
                <option value="Globe">Globe</option>
                <option value="DITO">DITO</option>
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
import { computed } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { initFlowbite } from 'flowbite';
import { capitalizeWords, formatContactNumber } from './DashboardTS/utils';
import { auth, db } from '../firebase/init'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, getDoc, query, where } from 'firebase/firestore';

const filterOpen = ref(false);
const telecoms = ref(['All', 'Globe', 'Smart', 'TNT', 'TM', 'DITO']);
const showModal = ref(false);
const editingIndex = ref<number | null>(null);
const openIndex = ref<number | null>(null);
const newCustomer = ref({ name: '', contact_number: '', telecom: '' });
const search = ref('');
const selectedTelecom = ref('All');
const customers = ref<any[]>([]);
let loggedInUserName = ''; // Initialize loggedInUserName
let unsubscribe: () => void;
const isLoading = ref(true);

const editCustomer = (index: number) => {
  newCustomer.value = { ...customers.value[index] };
  editingIndex.value = index;
  toggleModal();
};

const submitForm = async () => {
  if (editingIndex.value === null) {
    await addCustomer();
  } else {
    await updateCustomer();
  }
  showModal.value = false;
  openIndex.value = null;
};

const deleteCustomer = async (index: number) => {
  try {
    await deleteDoc(doc(db, 'customers', customers.value[index].id));
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

const updateCustomer = async () => {
  if (editingIndex.value !== null && customers.value[editingIndex.value]?.id) {
    try {
      await updateDoc(
        doc(db, 'customers', customers.value[editingIndex.value].id),
        {
          name: capitalizeWords(newCustomer.value.name), // Capitalize name before updating
          contact_number: formatContactNumber(newCustomer.value.contact_number), // Format contact number before updating
          telecom: newCustomer.value.telecom
        }
      );
      toggleModal();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
};



const addCustomer = async () => {
  try {
    await addDoc(collection(db, 'customers'), {
      name: capitalizeWords(newCustomer.value.name), // Capitalize name before adding
      contact_number: formatContactNumber(newCustomer.value.contact_number), // Format contact number before adding
      telecom: newCustomer.value.telecom,
      added_by: loggedInUserName // Include the logged-in user's username
    });
    toggleModal();
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const toggleModal = () => {
  if (showModal.value) {
    editingIndex.value = null;
    openIndex.value = null;
    newCustomer.value = { name: '', contact_number: '', telecom: '' };
  }
  showModal.value = !showModal.value;
};

const filteredCustomers = computed(() => {
  return customers.value.filter(customer =>
    (!search.value || customer.name.toLowerCase().includes(search.value.toLowerCase()) ||
      customer.contact_number.includes(search.value) ||
      customer.telecom.toLowerCase().includes(search.value.toLowerCase())) &&
    (selectedTelecom.value === 'All' || customer.telecom === selectedTelecom.value)
  );
});

onMounted(async () => {
  initFlowbite();

  const user = auth.currentUser;

  if (user) {
    try {
      const userSnapshot = await getDoc(doc(db, 'users', user.uid));
      if (userSnapshot.exists()) {
        loggedInUserName = userSnapshot.data()?.username;
      } else {
        console.error('User document does not exist.');
        // Handle the case where the user document doesn't exist
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      // Handle the error appropriately
    }
  } else {
    console.error('No user logged in.');
    return; // If no user is logged in, we don't need to fetch the customers
  }

  const customersCollection = collection(db, 'customers');
  const q = query(customersCollection, where('added_by', '==', loggedInUserName));

  unsubscribe = onSnapshot(q, (snapshot) => {
    customers.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    isLoading.value = false; // Add this line
    console.log(customers.value); // Print all customers in the console
  });

  // onUnmounted(unsubscribe);
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

</script>


