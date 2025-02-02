import { defineStore } from 'pinia'
import { Customer, FetchParams, PaginatedResource } from '..'
import axios from '@/lib/axios'
import { AxiosError } from 'axios'

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

        async storeCustomer(customer: Customer) {
            try {
                const { data } = await axios.post('/customers', customer)

                return data as MutateCustomerSuccessResponse
            } catch (error) {
                if (
                    !(error instanceof AxiosError) ||
                    !error.response ||
                    error.response.status !== 422
                ) {
                    throw error
                }

                return error.response?.data as MutateCustomerErrorResponse
            }
        },

        async updateCustomer(customer: Customer) {
            try {
                const { data } = await axios.patch(
                    `/customers/${customer?.id}`,
                    customer
                )

                return data as MutateCustomerSuccessResponse
            } catch (error) {
                if (
                    !(error instanceof AxiosError) ||
                    !error.response ||
                    error.response.status !== 422
                ) {
                    throw error
                }

                return error.response?.data as MutateCustomerErrorResponse
            }
        },

        async deleteCustomer(id: number) {
            const { data } = await axios.delete(`/customers/${id}`)

            return data as {
                message: string
            }
        },
    },
})

type CustomerStoreState = {
    customers?: PaginatedResource<Customer>
    loading: boolean
}

type MutateCustomerSuccessResponse = {
    message: string
    customer: Customer
}

type MutateCustomerErrorResponse = {
    errors: Record<string, string[]>
    message: string
}
