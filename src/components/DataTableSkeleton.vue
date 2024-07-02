<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
const props = defineProps<{ columns: number; rows: number }>()

const data = Array.from({ length: props.rows }, () =>
    Array.from({ length: props.columns }, () => 0)
)
</script>

<template>
    <DataTable :value="data">
        <Column v-for="_ in props.columns">
            <template #body>
                <Skeleton v-bind="$attrs" />
            </template>
        </Column>
    </DataTable>
</template>
