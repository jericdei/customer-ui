import { ComputedRef, inject } from 'vue'
import {
    DynamicDialogInstance,
    DynamicDialogOptions,
} from 'primevue/dynamicdialogoptions'
import { useDialog as usePrimeVueDialog } from 'primevue/usedialog'
import defaultDialogProps from '@/config/dialog'

export function useDialog() {
    const dialog = usePrimeVueDialog()

    const open = (content: any, options?: DynamicDialogOptions) => {
        dialog.open(content, {
            ...options,
            props: {
                ...defaultDialogProps,
                ...options?.props,
            },
        })
    }

    return { open }
}

export function useDialogRef() {
    return inject<ComputedRef<DynamicDialogInstance>>(
        'dialogRef'
    ) as ComputedRef<DynamicDialogInstance>
}
