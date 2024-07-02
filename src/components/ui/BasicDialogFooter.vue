<script setup lang="ts">
import Button from 'primevue/button'
import { useDialogRef } from '../../composables/dialog'

const {
    value: { close },
} = useDialogRef()
</script>

<template>
    <div class="flex items-center justify-end">
        <Button label="Close" severity="danger" @click="close" />
    </div>
</template>
