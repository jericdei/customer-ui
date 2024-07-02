import { defineStore } from 'pinia'
import { Customer, FetchParams, PaginatedResource } from '..'
import axios from '@/lib/axios'
import { AxiosError } from 'axios'

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

        async storeCustomer(customer: Customer) {
            try {
                const { data } = await axios.post('/customers', customer)

                return data as {
                    message: string
                    customer: Customer
                }
            } catch (error) {
                if (
                    !(error instanceof AxiosError) ||
                    !error.response ||
                    error.response.status !== 422
                ) {
                    throw error
                }

                return error.response?.data as {
                    errors: Record<string, string[]>
                    message: string
                }
            }
        },

        async updateCustomer(customer: Customer) {
            try {
                const { data } = await axios.patch(
                    `/customers/${customer.id}`,
                    customer
                )

                return data as {
                    message: string
                    customer: Customer
                }
            } catch (error) {
                if (
                    !(error instanceof AxiosError) ||
                    !error.response ||
                    error.response.status !== 422
                ) {
                    throw error
                }

                return error.response?.data as {
                    errors: Record<string, string[]>
                    message: string
                }
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
