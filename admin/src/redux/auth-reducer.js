let initialState = {
    userId: null,
    email: '',
    login: '',
    role: '',
    isAuth:false
}

const authReduser = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USER_DATA':
        return{
            ...state,
            ...action.data,
            isAuth:true
        }
        case 'Log_Out':
            return {
                ...state,
                ...action.data,
                isAuth: false
            }
   default: 
       return state;
   }
}

export const setUserData = (userId, email, login, role) => ({ type: 'SET_USER_DATA', data: { userId, email, login, role } })
export const Loguot = () => ({ type: 'Log_Out', data: { userId: '', email: '', login: '', role:'' } })
export default authReduser;