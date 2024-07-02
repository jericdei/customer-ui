<script setup lang="ts">
import { useDialogRef } from '@/composables/dialog'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { computed, ref } from 'vue'
import { watch } from 'vue'
import FormErrors from './ui/FormErrors.vue'

const dialogRef = useDialogRef()
const customer = dialogRef.value.data.customer

const errors = computed(() => dialogRef.value.data.formErrors)

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
        <div>
            <FloatLabel class="w-full">
                <InputText
                    v-model="form.first_name"
                    id="first_name"
                    class="w-full"
                    :invalid="Boolean(errors?.first_name)"
                />

                <label for="first_name">First Name</label>
            </FloatLabel>

            <FormErrors :errors="errors?.first_name" />
        </div>

        <div>
            <FloatLabel class="w-full">
                <InputText
                    v-model="form.last_name"
                    id="last_name"
                    class="w-full"
                    :invalid="Boolean(errors?.last_name)"
                />

                <label for="last_name">Last Name</label>
            </FloatLabel>

            <FormErrors :errors="errors?.last_name" />
        </div>

        <div>
            <FloatLabel class="w-full">
                <InputText
                    v-model="form.email"
                    id="email"
                    class="w-full"
                    type="email"
                    :invalid="Boolean(errors?.email)"
                />

                <label for="email">Email Address</label>
            </FloatLabel>

            <FormErrors :errors="errors?.email" />
        </div>

        <div>
            <FloatLabel class="w-full">
                <InputText
                    v-model="form.contact_number"
                    id="contact_number"
                    class="w-full"
                    :invalid="Boolean(errors?.contact_number)"
                />

                <label for="contact_number">Contact Number</label>
            </FloatLabel>

            <FormErrors :errors="errors?.contact_number" />
        </div>
    </div>
</template>
