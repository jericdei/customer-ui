<script setup lang="ts">
import moment from 'moment'
import { useDialogRef } from '@/composables/dialog'

const {
    value: {
        data: { customer },
        // close,
    },
} = useDialogRef()
</script>

<template>
    <div class="mt-8 grid grid-cols-12 gap-8 px-16">
        <div class="col-span-6">
            <ul class="space-y-2">
                <li>
                    <span class="font-bold">First Name: </span
                    >{{ customer.first_name }}
                </li>

                <li>
                    <span class="font-bold">Last Name: </span
                    >{{ customer.last_name }}
                </li>

                <li>
                    <span class="font-bold">Email Address: </span
                    >{{ customer.email }}
                </li>
            </ul>
        </div>

        <div class="col-span-6">
            <ul class="space-y-2">
                <li>
                    <span class="font-bold">Contact Number: </span
                    >{{ customer.contact_number }}
                </li>

                <li>
                    <span class="font-bold">Date Created: </span
                    >{{
                        moment(customer.created_at).format(
                            'MMMM D, YYYY, h:mm:ss a'
                        )
                    }}
                </li>

                <li>
                    <span class="font-bold">Last Updated On: </span
                    >{{
                        moment(customer.updated_at).format(
                            'MMMM D, YYYY, h:mm:ss a'
                        )
                    }}
                </li>
            </ul>
        </div>
    </div>
</template>
