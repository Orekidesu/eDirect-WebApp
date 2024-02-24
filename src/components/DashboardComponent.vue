<template>
  <!-- <div class="flex items-center justify-center my-5 px-20"> -->

  <div class="flex items-center justify-center my-5 ">
    <input v-model="search"
      class=" bg-transparent border border-primary sm:text-sm rounded-lg  block p-2.5 focus:ring focus:border-accent "
      type="search" name="search" placeholder="Search">


    <div class="relative" style=" z-index: 2;">
      <button class="font-bold rounded" @click="filterOpen = !filterOpen">
        <img src="../assets/filter2.svg" alt="Filter Icon" class="w-8 h-6">
      </button>
      <div v-show="filterOpen"
        class="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg  text-secondary-foreground bg-secondary ring-1 ring-black ring-opacity-5">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" class="block px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground" role="menuitem"
            v-for="telecom in telecoms" :key="telecom" @click="selectedTelecom = telecom; filterOpen = false">
            {{ telecom }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- ================================================ LIST OF CUSTOMERS AREA ================================================  -->
  <div v-if="isLoading" class="flex justify-center items-center pt-10">
    <div class="animate-spin rounded-full h-20 w-20 border-t-2 border border-b-2 border-primary">
    </div>
  </div>
  <div v-else
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-15 overflow-y-auto px-14 max-h-screen justify-center pb-40">
    <div v-for="(customer, index) in filteredCustomers" :key="index"
      class="rounded-lg p-4 shadow border-2 bg-secondary text-secondary-foreground">

      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-bold">
          {{ customer.last_name ? customer.last_name + ',' : '' }}
          <span>{{ customer.first_name }}</span>
        </h2>
        <div class="relative inline-block text-left">
          <button class=" font-bold py-1 px-2 rounded bg-transparent"
            @click="openIndex = openIndex === index ? null : index" title="edit details">
            <span class="material-symbols-outlined">
              edit
            </span>
          </button>
          <div v-show="openIndex === index"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg text-secondary-foreground bg-secondary ring-1 ring-black ring-opacity-5">

            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" class="block px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground " role="menuitem"
                @click="editCustomer(customer.id)">Edit</a>
              <a href="#" class="block px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground" role="menuitem"
                @click="deleteCustomer(customer.id)">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <br>
      <p class="">Contact No.: {{ customer.contact_number }}</p>
      <p class="">Telecom: {{ customer.telecom }}</p>
    </div>
    <div v-if="filteredCustomers.length === 0" class="text-center py-4">
      There's no such customer yet.
    </div>
  </div>
  <!-- ================================================ END LIST OF CUSTOMERS AREA ================================================  -->

  <!-- ================================================  BUTTON  AREA================================================ -->

  <div class="fixed bottom-5 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
    <button @click="toggleModal" class="hover:bg-primary hover:text-primary-foreground font-bold py-1 px-2 rounded">
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
      <div class="relative bg-secondary text-secondary-foreground">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
          <h3 class="text-xl font-semibold">
            {{ editingIndex === null ? 'Add Customer' : 'Edit Customer' }}
          </h3>
          <button type="button"
            class="end-2.5  bg-transparent hover:bg-primary hover:text-primary-foreground rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            @click="toggleModal">
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        <div class="p-4 md:p-5">
          <form class="space-y-4" @submit.prevent="submitForm">
            <div class="flex flex-row gap-2">
              <div>
                <label for="first_name" class="block mb-2 text-sm font-medium">First Name</label>
                <input v-model="newCustomer.first_name" type="text" name="name" id="name"
                  class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                  placeholder="Enter  First Name" required />
              </div>
              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium">Last Name</label>
                <input v-model="newCustomer.last_name" type="text" name="name" id="name"
                  class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                  placeholder="Enter  Last Name" />
              </div>
            </div>
            <div>
              <label for="contact_number" class="block mb-2 text-sm font-medium ">Contact
                Number</label>
              <input v-model="newCustomer.contact_number" type="tel" name="contact_number" id="contact_number"
                class="bg-transparent border border-primary sm:text-sm rounded-lg  block w-full p-2.5 focus:ring focus:border-accent"
                placeholder="09XXXXXXXXX" required />
            </div>
            <div>
              <label for="telecom" class="block mb-2 text-sm font-medium ">Telecom</label>
              <select v-model="newCustomer.telecom" name="telecom" id="telecom"
                class="bg-accent border text-sm rounded-lg  block w-full p-2.5" required>
                <!-- <option value="All">All</option> -->
                <option value="Talk N text">TNT</option>
                <option value="Smart">Smart</option>
                <option value="TM">TM</option>
                <option value="Globe">Globe</option>
                <option value="DITO">DITO</option>
              </select>
            </div>
            <div class="flex justify-center">
              <button type="submit"
                class=" bg-blue-600 hover:bg-blue-800 focus:ring focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit
              </button>
            </div>
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
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, getDoc, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';


const filterOpen = ref(false);
const telecoms = ref(['All', 'Globe', 'Smart', 'TNT', 'TM', 'DITO']);
const showModal = ref(false);
const editingIndex = ref<number | null>(null);
const openIndex = ref<number | null>(null);
const newCustomer = ref({ first_name: '', last_name: '', contact_number: '', telecom: '' });
const search = ref('');
const selectedTelecom = ref('All');
const customers = ref<any[]>([]);
let loggedInUserName = ''; // Initialize loggedInUserName
let unsubscribe: () => void;
const isLoading = ref(true);

const editCustomer = (id: string) => {
  const customer = customers.value.find(customer => customer.id === id);
  if (customer) {
    newCustomer.value = { ...customer };
    editingIndex.value = customers.value.findIndex(customer => customer.id === id);
  }
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

const deleteCustomer = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'customers', id));
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

const updateCustomer = async () => {
  if (editingIndex.value !== null && customers.value[editingIndex.value]?.id) {
    try {
      const currentCustomerId = customers.value[editingIndex.value].id;
      const querySnapshot = await getDocs(query(collection(db, 'customers'),
        where('contact_number', '==', formatContactNumber(newCustomer.value.contact_number)),
        where('added_by', '==', loggedInUserName),
        where('__name__', '!=', currentCustomerId)
      ));

      if (!querySnapshot.empty) {
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'This number already exists!',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          width: '300px',
        });
        return;
      }

      await updateDoc(
        doc(db, 'customers', currentCustomerId),
        {
          first_name: capitalizeWords(newCustomer.value.first_name), // Capitalize name before updating
          last_name: capitalizeWords(newCustomer.value.last_name), // Capitalize name before updating
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
    // Query the database for the contact number added by the current user
    const querySnapshot = await getDocs(query(collection(db, 'customers'), where('contact_number', '==', formatContactNumber(newCustomer.value.contact_number)), where('added_by', '==', loggedInUserName)));

    // If the number exists, alert the user and stop the function
    if (!querySnapshot.empty) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'This number already exists!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        width: '300px',
      });
      return;
    }

    // If the number doesn't exist, add the new customer
    await addDoc(collection(db, 'customers'), {
      first_name: capitalizeWords(newCustomer.value.first_name), // Capitalize name before adding
      last_name: capitalizeWords(newCustomer.value.last_name), // Capitalize name before adding
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
    newCustomer.value = { first_name: '', last_name: '', contact_number: '', telecom: '' };
  }
  showModal.value = !showModal.value;
};

const filteredCustomers = computed(() => {
  return customers.value
    .filter(customer =>
      (!search.value || customer.first_name.toLowerCase().includes(search.value.toLowerCase()) || customer.last_name.toLowerCase().includes(search.value.toLowerCase()) ||
        customer.contact_number.includes(search.value) ||
        customer.telecom.toLowerCase().includes(search.value.toLowerCase())) &&
      (selectedTelecom.value === 'All' || customer.telecom === selectedTelecom.value)
    )
    .sort((a, b) => {
      let nameA = a.last_name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.last_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // names must be equal
    });
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


