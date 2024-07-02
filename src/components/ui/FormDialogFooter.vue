<script setup lang="ts">
import Button from 'primevue/button'
import { useDialogRef } from '@/composables/dialog'

const dialogRef = useDialogRef()

defineEmits<{
    (e: 'submit', data: any): void
}>()
</script>

<template>
    <div class="mt-4 flex w-full items-center justify-end gap-2">
        <Button label="Close" severity="danger" @click="dialogRef.close()" />
        <Button
            label="Submit"
            severity="success"
            @click="$emit('submit', dialogRef.data.formData)"
        />
    </div>
</template>
