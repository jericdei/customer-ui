<script setup lang="ts">
import DataTable, { DataTableSortEvent } from 'primevue/datatable'
import { Customer, FetchParams } from '..'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Menu, { MenuMethods } from 'primevue/menu'
import { onMounted, ref, watch } from 'vue'
import { MenuItem } from 'primevue/menuitem'
import { useCustomerStore } from '@/stores/customers'
import Skeleton from 'primevue/skeleton'
import debounce from 'lodash.debounce'
import moment from 'moment'
import useCustomerActions from '@/composables/customer-actions'

const customerStore = useCustomerStore()

onMounted(async () => await customerStore.fetchCustomers())

const datatable = ref()

const customerActions = useCustomerActions(datatable)

const params = ref<FetchParams>({
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
        command: () => customerActions.show(selectedCustomer.value as Customer),
    },
    {
        label: 'Edit',
        icon: 'ri-pencil-line',
        command: () => customerActions.form(selectedCustomer.value as Customer),
    },
    {
        label: 'Delete',
        icon: 'ri-delete-bin-line',
        command: () =>
            customerActions.destroy(selectedCustomer.value?.id as number),
    },
]

watch(
    () => params.value.q,
    debounce(async () => await customerStore.fetchCustomers(params.value), 500)
)

function toggleMenu(event: MouseEvent, customer: Customer) {
    selectedCustomer.value = customer

    menu.value?.toggle(event)
}

async function paginate(page: number, per_page: number) {
    params.value = {
        ...params.value,
        page,
        per_page,
    }

    await customerStore.fetchCustomers(params.value)
}

async function sort(event: DataTableSortEvent) {
    const order = event.sortOrder && event.sortOrder === 1 ? 'asc' : 'desc'

    params.value = {
        ...params.value,
        page: 1,
        sort: {
            field: (event.sortField as string) ?? 'id',
            order: order as 'asc' | 'desc',
        },
    }

    await customerStore.fetchCustomers(params.value)
}
</script>

<template>
    <DataTable
        ref="datatable"
        :value="customerStore.customers?.data"
        data-key="id"
        :total-records="customerStore.customers?.total"
        :rows="10"
        :rows-per-page-options="[10, 50, 100]"
        current-page-report-template="{first} to {last} of {totalRecords}"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        striped-rows
        lazy
        paginator
        removable-sort
        @page="paginate($event.page + 1, $event.rows)"
        @sort="sort"
    >
        <template #header>
            <div class="flex justify-between">
                <InputText v-model="params.q" placeholder="Search" />

                <Button
                    label="New"
                    icon="ri-add-circle-fill"
                    severity="success"
                    @click="customerActions.form()"
                />
            </div>
        </template>

        <template #empty>
            <p class="p-16 text-center">No records found.</p>
        </template>

        <Column header="ID" sortable sort-field="id">
            <template #body="{ data }">
                <Skeleton v-if="customerStore.loading" class="!h-8" />

                <span v-else>{{ data.id }}</span>
            </template>
        </Column>

        <Column header="Name" sortable sort-field="first_name">
            <template #body="{ data }">
                <Skeleton v-if="customerStore.loading" class="!h-8" />

                <span v-else>{{ data.full_name }}</span>
            </template>
        </Column>

        <Column header="Date Created" sortable sort-field="created_at">
            <template #body="{ data }">
                <Skeleton v-if="customerStore.loading" class="!h-8" />

                <span v-else>{{
                    moment(data.created_at).format('MMMM D, YYYY')
                }}</span>
            </template>
        </Column>

        <Column header="Last Updated" sortable sort-field="updated_at">
            <template #body="{ data }">
                <Skeleton v-if="customerStore.loading" class="!h-8" />

                <span v-else>{{ moment(data.updated_at).fromNow() }}</span>
            </template>
        </Column>

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
