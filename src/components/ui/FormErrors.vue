<script setup lang="ts">
defineProps<{ errors?: string[] }>()
</script>

<template>
    <div v-if="errors?.length !== 0">
        <small v-for="error in errors" :key="error" class="text-red-700">{{
            error
        }}</small>
    </div>
</template>
