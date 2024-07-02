<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog'
import CustomerDataTable from '@/components/CustomerDataTable.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
</script>

<template>
    <div class="px-8 py-12 dark:bg-slate-900 dark:text-slate-100">
        <header class="flex justify-center">
            <p class="text-4xl font-bold">Customers</p>
        </header>

        <main class="mt-8 px-32">
            <CustomerDataTable />
        </main>

        <DynamicDialog />
        <ConfirmDialog />
        <Toast />
    </div>
</template>
