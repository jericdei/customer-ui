<script setup lang="ts">
import Button from 'primevue/button'
import { useDialogRef } from '@/composables/dialog'

const dialogRef = useDialogRef()
</script>

<template>
    <div class="mt-4 flex w-full items-center justify-end">
        <Button label="Close" severity="danger" @click="dialogRef.close()" />
    </div>
</template>
