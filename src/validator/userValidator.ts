import type {User} from '../model/auth'

export const validateUser = function (user: User): string {
    const password = user.password;
    const email = user.username;

    if(password.length < 8){
        return 'Password must be at least 8 characters long';
    }

    if(!/[A-Z]/.test(password)){
        return 'Password must contain at least one upper case letter.'; 
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lower case letter.';
    }

    // Check if password contains at least one special character
    if (!/[@#$%^*&+=]/.test(password)) {
        return 'Password must contain at least one special character (@#$%^&+=).';
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
        console.log(email);
        return 'Invalid email address';
    }

    return ''

}