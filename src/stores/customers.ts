import { defineStore } from 'pinia'
import { Customer, FetchParams, PaginatedResource } from '..'
import axios from '@/lib/axios'

type CustomerStoreState = {
    customers?: PaginatedResource<Customer>
    loading: boolean
}

export const useCustomerStore = defineStore('customers', {
    state: (): CustomerStoreState => ({ customers: undefined, loading: true }),
    actions: {
        async fetchCustomers(params?: FetchParams) {
            this.loading = true

            if (!params) {
                params = {
                    page: 1,
                    per_page: 10,
                }
            }

            const { data } = await axios.get('/customers', {
                params,
            })

            this.customers = data
            this.loading = false
        },

        async deleteCustomer(id: number) {
            const { data } = await axios.delete(`/customers/${id}`)

            return data as {
                message: string
            }
        },
    },
})
