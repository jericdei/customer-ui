import { useConfirm } from 'primevue/useconfirm'
import { useCustomerStore } from '../stores/customers'
import { useToast } from 'primevue/usetoast'

export default function useCustomerActions() {
    const customerStore = useCustomerStore()
    const confirm = useConfirm()
    const toast = useToast()

    const deleteCustomer = async (id: number) => {
        confirm.require({
            header: 'Confirm delete',
            message: 'Are you sure you want to delete this customer?',
            icon: 'ri-error-warning-line',
            rejectProps: {
                label: 'No',
                severity: 'danger',
            },
            acceptProps: {
                label: 'Yes',
            },
            accept: async () => {
                const { message } = await customerStore.deleteCustomer(id)

                toast.add({
                    summary: 'Success!',
                    detail: message,
                    life: 3000,
                    severity: 'success',
                })

                await customerStore.fetchCustomers()
            },
        })
    }

    return { deleteCustomer }
}
