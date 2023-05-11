export class User {
    _id!: string;
    name!: string;
    mobileNumber!: string;
    emailId!: string;
    accessType!: string;
}

export const userForm = {
    name: '',
    mobileNumber: '',
    dob: '',
    emailId: '',
    password:'',
    gender: ''
};


export const predictionForm = { 
itching: '',
skin_rash: '', 
nodal_skin_eruptions:'', 
continuous_sneezing:'',
shivering: '',
chills: '',
joint_pain:'',
stomach_pain:'',
acidity: '',
ulcers_on_tongue:'',
muscle_wasting:'',
vomiting:'',
burning_micturition: '',
spotting_urination:'',
fatigue:'',
weight_gain:'',
anxiety:'',
cold_hands_and_feets:'',
mood_swings:'',
weight_loss:''
};