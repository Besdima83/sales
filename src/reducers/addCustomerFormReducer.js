import db from "../firebaseConfig";


const ADD_CUSTOMER = 'ADD_CUSTOMER'

const initialState = {
    customers: [],
}

const addCustomerFormReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER:
            return (
                db.collection('customers').doc()
                    .set(action.payload)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    })
            )
        default:
            return state
    }
}

export const addCustomerAC = (payload) => ({type: ADD_CUSTOMER, payload})

export default addCustomerFormReducer
