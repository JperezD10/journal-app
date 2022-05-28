import { types } from '../types/types';
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import { startLoading, finishLoading } from './ui';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) =>{

        //seteo redux para que se muestre el loading
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( ({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        })
        .catch( (err) => {
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            });
        });
        
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async({user}) => {
            await user.updateProfile({displayName: name});

            dispatch(login(user.uid, user.displayName))
        })
        .catch( (err) => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
            }));
    }
}

export const startGoogleLogin = () => {
    return (dispatch) =>{
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) =>{
                dispatch(
                    //esto me setea en redux el usuario que se logueo
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const startLogOut = () => {
    return async (dispatch) =>{
        await firebase.auth().signOut();
        
        dispatch(logOut());
    }
}

export const login = (uid, displayName) => {
    //esto es lo que me pide mi reducer
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const logOut = () => {
    return {
        type: types.logout,
        payload:{
            uid: null,
            displayName: null
        }
    }
}