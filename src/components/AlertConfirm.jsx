import Swal from 'sweetalert2'
import {
    ALERT_CONFIRM_TITLE,
    ALERT_CONFIRM_TEXT,
    ALERT_CONFIRM_BUTTON_TEXT
} from '../config/consts'

export const AlertConfirm = (cb) => {
    Swal.fire({
        title: ALERT_CONFIRM_TITLE,
        text: ALERT_CONFIRM_TEXT,
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonText: ALERT_CONFIRM_BUTTON_TEXT,
        customClass: { 
            confirmButton: 'btn btn-sm btn-primary bg-primary bg-opacity-50 border-0 shadow-none text-dark',
            cancelButton: 'btn btn-sm btn-warning bg-secondary bg-opacity-50 border-0 shadow-none text-dark',
            popup: 'bg-dark text-primary border border-2 border-primary py-2' 
        }
    }).then((result) => {
        if (result.isConfirmed) {
            cb()
        }
    })
}