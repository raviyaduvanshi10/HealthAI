export class User {
    _id!: string;
    name!: string;
    mobileNumber!: string;
    emailId!: string;
    accessType!: string;
    active!: boolean;
}

export const userForm = {
    name: '',
    mobileNumber: '',
    dob: '',
    emailId: '',
    password:'',
    gender: ''
};