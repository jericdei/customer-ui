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
import { ref } from 'vue'

/**
 * Composable for common customer actions.
 *
 * @param datatableRef - (Optional) If the action came from a datatable, include the ref to force reset the pagination after an action.
 */
export default function useCustomerActions(datatableRef?: any) {
    const customerStore = useCustomerStore()
    const dialog = useDialog()
    const confirm = useConfirm()
    const toast = useToast()

    const form = (customer?: Customer) => {
        const formErrors = ref()

        const dialogRef = dialog.open(markRaw(CustomerFormModal), {
            props: {
                header: 'Customer Form',
            },
            data: {
                customer,
                formData: null,
                formErrors,
            },
            templates: {
                footer: markRaw(FormDialogFooter),
            },
            emits: {
                onSubmitForm: (customer: any) => {
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
                            let response

                            if (customer?.id) {
                                response =
                                    await customerStore.updateCustomer(customer)
                            } else {
                                response =
                                    await customerStore.storeCustomer(customer)
                            }

                            // Handle validation errors
                            if ('errors' in response) {
                                // Reactively update formErrors, so it can be used inside the form modal component :)
                                formErrors.value = response.errors

                                toast.add({
                                    summary: 'Validation Error!',
                                    detail: response.message,
                                    life: 3000,
                                    severity: 'error',
                                })

                                return
                            }

                            toast.add({
                                summary: 'Success!',
                                detail: response.message,
                                life: 3000,
                                severity: 'success',
                            })

                            dialogRef.close()

                            // Reset table pagination
                            await customerStore.fetchCustomers({ page: 1 })
                            datatableRef?.value.resetPage()
                        },
                    })
                },
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

                // Reset table pagination
                await customerStore.fetchCustomers({ page: 1 })
                datatableRef?.value.resetPage()
            },
        })
    }

    return { form, show, destroy }
}
