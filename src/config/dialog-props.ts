import { DialogProps } from 'primevue/dialog'

/**
 * Default modal props for DynamicDialog.
 */
const props: DialogProps = {
    position: 'top',
    style: {
        width: '50vw',
    },
    breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
    },
    modal: true,
    maximizable: false,
    draggable: false,
    closeOnEscape: false,
}

export default props
