import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let passwordControl = control.get('password')
        let confirmPasswordControl = control.get('confirmPassword')

        let validationError = { 'UnmatchPasswords': { 'pass': passwordControl?.value, 'confirmPass': confirmPasswordControl?.value } }

        return (passwordControl?.value == confirmPasswordControl?.value) ? null : validationError

    }
}