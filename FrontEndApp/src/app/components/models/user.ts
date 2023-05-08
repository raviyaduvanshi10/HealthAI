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
    userName: '',
    mobileNumber: '',
    emailId: '',
    dob: '',
    userId: '',
    gender: ''
};