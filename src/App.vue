<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from './lib/axios'
import { Customer, PaginatedResource } from '.'
import DataTableSkeleton from './components/DataTableSkeleton.vue'
import CustomerDataTable from './components/CustomerDataTable.vue'

const customers = ref<PaginatedResource<Customer>>()
const isLoading = ref(true)

onMounted(async () => await getCustomers())

async function getCustomers() {
    isLoading.value = true

    const { data } = await axios.get('/customers', {
        params: {
            page: 1,
            per_page: 10,
            sort: {
                field: 'id',
                order: 'desc',
            },
        },
    })

    customers.value = data
    isLoading.value = false
}
</script>

<template>
    <div class="px-8 py-12 dark:bg-slate-900 dark:text-slate-100">
        <header class="flex justify-center">
            <p class="text-4xl font-bold">Customers</p>
        </header>

        <main class="mt-8 px-32">
            <DataTableSkeleton
                v-if="isLoading"
                :columns="6"
                :rows="10"
                class="!h-8"
            />

            <CustomerDataTable v-else :data="customers!" />
        </main>
    </div>
</template>
