<script setup lang="ts">
import Button from 'primevue/button'
import { useDialogRef } from '@/composables/dialog'

const {
    value: { close },
} = useDialogRef()
</script>

<template>
    <div class="mt-4 flex w-full items-center justify-between">
        <div class="space-x-2">
            <Button
                label="Edit"
                icon="ri-pencil-line"
                severity="info"
                @click="close"
            />

            <Button
                label="Delete"
                icon="ri-delete-bin-line"
                severity="danger"
                @click="close"
            />
        </div>

        <Button label="Close" severity="danger" @click="close" />
    </div>
</template>
