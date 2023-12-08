import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

interface SweetAlertProps {
    title: string;
    text: string;
    icon?: SweetAlertIcon;
}

export const ConfirmationSweetAlert = async ({
    title,
    text,
    icon,
}: SweetAlertProps): Promise<SweetAlertResult<SweetAlertIcon>> => {
    const result: SweetAlertResult<SweetAlertIcon> = await Swal.fire({
        title: title,
        text: text,
        icon: icon || 'warning',
        iconColor: '#ef4444',
        color: 'black',
        showCancelButton: true,
        confirmButtonColor: '#096C2F',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        customClass: {
            container: 'sweet-alert-container',
            popup: 'sweet-alert-popup',
            confirmButton: 'sweet-alert-confirm-button',
            cancelButton: 'sweet-alert-cancel-button',
        },
        willOpen: () => {
            // const container = Swal.getContainer();
            const popup = Swal.getPopup();
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();

            // if (container) {
            //     container.style.backdropFilter = 'blur(2px)';
            // }
            if (popup) {
                popup.style.borderRadius = '20px';
            }
            if (confirmButton) {
                confirmButton.style.borderRadius = '15px';
            }
            if (cancelButton) {
                cancelButton.style.borderRadius = '15px';
            }
        },
    });

    return result;
};

interface ErrorSweetAlertProps {
    title?: string;
    text?: string;
}

export const ErrorSweetAlert = ({ title, text }: ErrorSweetAlertProps) => {
    Swal.fire({
        title: title || 'Oops...',
        text: text || 'Something went wrong!',
        icon: 'error',
        iconColor: '#ef4444',
        color: 'black',
        position: 'center',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
            popup: 'rounded-3xl',
        },
    });
};

export const SuccessSweetAlert = ({ title, text }: SweetAlertProps) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        iconColor: '#22c55e',
        color: 'black',
        position: 'center',
        timer: 1500,
        showConfirmButton: false,
        customClass: {
            popup: 'rounded-3xl',
        },
    });
};
