import { ComputedRef, inject } from 'vue'
import {
    DynamicDialogInstance,
    DynamicDialogOptions,
} from 'primevue/dynamicdialogoptions'
import { useDialog as usePrimeVueDialog } from 'primevue/usedialog'
import defaultDialogProps from '@/config/dialog-props'

/**
 * Extended PrimeVue `useDialog` composable that includes customized default dialog props.
 */
export function useDialog() {
    const dialog = usePrimeVueDialog()

    const open = (content: any, options?: DynamicDialogOptions) => {
        return dialog.open(content, {
            ...options,
            props: {
                ...defaultDialogProps,
                ...options?.props,
            },
        })
    }

    return { open }
}

/**
 * Composable to easily access dialog injected ref.
 */
export function useDialogRef() {
    return inject<ComputedRef<DynamicDialogInstance>>(
        'dialogRef'
    ) as ComputedRef<DynamicDialogInstance>
}
