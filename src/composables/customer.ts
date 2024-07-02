import { useConfirm } from 'primevue/useconfirm'
import { useCustomerStore } from '@/stores/customers'
import { useToast } from 'primevue/usetoast'
import { Customer } from '..'
import { useDialog } from '@/composables/dialog'
import ResourceDialogFooter from '@/components/ui/ResourceDialogFooter.vue'
import { markRaw } from 'vue'
import CustomerShowModal from '@/components/CustomerShowModal.vue'
import CustomerFormModal from '@/components/CustomerFormModal.vue'
import FormDialogFooter from '@/components/ui/FormDialogFooter.vue'

export default function useCustomerActions(datatableRef?: any) {
    const customerStore = useCustomerStore()
    const dialog = useDialog()
    const confirm = useConfirm()
    const toast = useToast()

    const form = (customer?: Customer) => {
        const dialogRef = dialog.open(markRaw(CustomerFormModal), {
            props: {
                header: 'Customer Form',
            },
            data: {
                customer,
                formData: null,
            },
            templates: {
                footer: markRaw(FormDialogFooter),
            },
            emits: {
                onSubmit: (customer: any) =>
                    confirm.require({
                        header: 'Confirm submission',
                        message: 'Are you sure you want to submit this form?',
                        icon: 'ri-error-warning-line',
                        rejectProps: {
                            label: 'No',
                            severity: 'danger',
                        },
                        acceptProps: {
                            label: 'Yes',
                        },
                        accept: async () => {
                            const { message } =
                                await customerStore.storeCustomer(customer)

                            // handle validation errors

                            toast.add({
                                summary: 'Success!',
                                detail: message,
                                life: 3000,
                                severity: 'success',
                            })

                            dialogRef.close()

                            await customerStore.fetchCustomers({ page: 1 })
                            datatableRef?.value.resetPage()
                        },
                    }),
            },
        })
    }

    const show = (customer: Customer) => {
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

    const destroy = (id: number) => {
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

                await customerStore.fetchCustomers({ page: 1 })
                datatableRef?.value.resetPage()
            },
        })
    }

    return { form, show, destroy }
}
