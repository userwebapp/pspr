import Swal from 'sweetalert2'

export const Toast = (msg, delay) => {
    const customClass = 'bg-dark text-primary border border-2 border-primary py-2'
    const t = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: delay ?? 1000,
        timerProgressBar: true,
        customClass: { popup: customClass },
    })
    t.fire({ title: msg })
}