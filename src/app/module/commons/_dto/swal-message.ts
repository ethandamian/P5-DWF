import Swal from "sweetalert2";

export class SwalMessages {

    confirmMessage: any;

    constructor() {
        this.confirmMessage = Swal.mixin({
            customClass: {
                title: 'swal-title',
                icon: 'swal-icon',
                confirmButton: 'btn btn-primary swal-confirm-button',
                cancelButton: 'btn btn-danger swal-cancel-button',
            },
            buttonsStyling: false
        });
    }

    // muestra mensaje de confirmación
    successMessage(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            showConfirmButton: false,
            timer: 4000,
            background: '#4d425f',
            color: 'white'
        });
    }

    // muestra mensaje de error
    errorMessage(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            background: '#4d425f',
            color: 'white',
            showConfirmButton: false,
            timer: 4000
        });
    }

    warningMessage(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            toast: true,
            text: message,
            background: '#4d425f',
            color: 'white',
            showConfirmButton: false,
            timer: 4000
        });
    }
}
