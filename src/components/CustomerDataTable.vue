<script setup lang="ts">
import DataTable, { DataTableMethods } from 'primevue/datatable'
import { Customer, PaginatedResource, Params } from '..'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Menu, { MenuMethods } from 'primevue/menu'
import { ref } from 'vue'
import { MenuItem } from 'primevue/menuitem'

const props = defineProps<{ data: PaginatedResource<Customer> }>()

const datatable = ref<DataTableMethods>()
const params = ref<Params>({
    q: '',
    page: 1,
    per_page: 10,
    sort: undefined,
})

const menu = ref<MenuMethods>()
const selectedCustomer = ref<Customer>()
const menuItems: MenuItem[] = [
    {
        label: 'View',
        icon: 'ri-eye-line',
        command: () => {
            console.log(selectedCustomer.value)
        },
    },
    {
        label: 'Edit',
        icon: 'ri-pencil-line',
        command: (e) => console.log(e),
    },
    {
        label: 'Delete',
        icon: 'ri-delete-bin-line',
        command: (e) => console.log(e),
    },
]

function toggleMenu(event: MouseEvent, customer: Customer) {
    selectedCustomer.value = customer

    menu.value?.toggle(event)
}

function paginate(page: number, per_page: number) {
    console.log(page, per_page)
}
</script>

<template>
    <DataTable
        ref="datatable"
        :value="props.data.data"
        data-key="id"
        :total-records="props.data.total"
        :rows="10"
        :rows-per-page-options="[10, 50, 100]"
        current-page-report-template="{first} to {last} of {totalRecords}"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        striped-rows
        lazy
        paginator
        @page="paginate($event.page + 1, $event.rows)"
    >
        <template #header>
            <div class="flex justify-between">
                <InputText v-model="params.q" placeholder="Search" />

                <Button
                    label="New"
                    icon="ri-add-circle-fill"
                    severity="success"
                />
            </div>
        </template>

        <Column header="ID" field="id" />
        <Column header="First Name" field="first_name" />
        <Column header="Last Name" field="last_name" />
        <Column header="Email Address" field="email" />
        <Column header="Contact Number" field="contact_number" />

        <Column>
            <template #body="{ data }">
                <Button
                    icon="ri-more-2-fill"
                    text
                    rounded
                    @click="toggleMenu($event, data)"
                />

                <Menu ref="menu" :model="menuItems" popup />
            </template>
        </Column>
    </DataTable>
</template>
