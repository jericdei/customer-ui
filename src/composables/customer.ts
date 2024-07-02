import { useConfirm } from 'primevue/useconfirm'
import { useCustomerStore } from '@/stores/customers'
import { useToast } from 'primevue/usetoast'
import { Customer } from '..'
import { useDialog } from '@/composables/dialog'
import ResourceDialogFooter from '@/components/ui/ResourceDialogFooter.vue'
import { markRaw } from 'vue'
import CustomerShowModal from '@/components/CustomerShowModal.vue'

export default function useCustomerActions() {
    const customerStore = useCustomerStore()
    const dialog = useDialog()
    const confirm = useConfirm()
    const toast = useToast()

    const showCustomer = async (customer: Customer) => {
        dialog.open(markRaw(CustomerShowModal), {
            props: {
                header: 'View Customer',
            },
            templates: {
                footer: markRaw(ResourceDialogFooter),
            },
            data: {
                customer,
            },
        })
    }

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

    return { showCustomer, deleteCustomer }
}
