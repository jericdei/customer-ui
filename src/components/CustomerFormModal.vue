<script setup lang="ts">
import { useDialogRef } from '@/composables/dialog'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { ref } from 'vue'
import { watch } from 'vue'

const dialogRef = useDialogRef()
const customer = dialogRef.value.data.customer

const form = ref({
    id: customer?.id ?? null,
    first_name: customer?.first_name ?? '',
    last_name: customer?.last_name ?? '',
    email: customer?.email ?? '',
    contact_number: customer?.contact_number ?? '',
})

watch(
    () => form.value,
    (newValue) => {
        dialogRef.value.data.formData = newValue
    },
    { deep: true }
)
</script>

<template>
    <div class="mt-8 grid grid-cols-2 gap-8">
        <FloatLabel class="w-full">
            <InputText
                v-model="form.first_name"
                id="first_name"
                class="w-full"
            />
            <label for="first_name">First Name</label>
        </FloatLabel>

        <FloatLabel class="w-full">
            <InputText v-model="form.last_name" id="last_name" class="w-full" />
            <label for="last_name">Last Name</label>
        </FloatLabel>

        <FloatLabel class="w-full">
            <InputText
                v-model="form.email"
                id="email"
                class="w-full"
                type="email"
            />
            <label for="email">Email Address</label>
        </FloatLabel>

        <FloatLabel class="w-full">
            <InputText
                v-model="form.contact_number"
                id="contact_number"
                class="w-full"
            />
            <label for="contact_number">Contact Number</label>
        </FloatLabel>
    </div>
</template>
