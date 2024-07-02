import { ComputedRef, inject } from 'vue'
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

export function useDialogRef() {
    return inject<ComputedRef<DynamicDialogInstance>>(
        'dialogRef'
    ) as ComputedRef<DynamicDialogInstance>
}
