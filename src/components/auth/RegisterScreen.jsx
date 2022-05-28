import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  //para disparar las acciones de redux
  const dispatch = useDispatch();

  //para obtener los valores de redux
  const {msgError} = useSelector( state => state.ui );

  useEffect(() => {
    dispatch( removeError() );
  }, [])

  const [ formValues, handleInputChange ] = useForm({
    name: 'Julian Perez',
    email: 'jperezdemonty@gmail.com',
    password: '123456',
    password2: '123456',
  });

  const { name,email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if(isFormValid().length === 0){
      dispatch(removeError());
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
    else{
      dispatch(setError(isFormValid()));
    }
  }

  const isFormValid = () => {
    let error = [];
    if(name.trim().length === 0){
      error.push("Name is required");
    }
    if(!validator.isEmail(email)){
      error.push("Email not valid");
    }
    if(password.trim().length < 5){
      error.push("Password is required");
    }
    if(password2 !== password){
      error.push("Passwords are not the same");
    }
    return error;
  }

  return (
    <div>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister}>

        {
          msgError && (
            <div className="auth__alert-error">
              <ul>
                {msgError.map( (err, index) => <li key={index}>{err}</li>)}
              </ul>
            </div>
          )
        }
        

        <input className='auth__input' autoComplete='off' type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange}/>
        <input className='auth__input' autoComplete='off' type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} />
        <input className='auth__input' type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
        <input className='auth__input' type="password" placeholder="Confirm password" name="password2" value={password2} onChange={handleInputChange} />

        <button type="submit" className='btn btn-primary btn-block'>
          Register
        </button>
      </form>
      
      <div className='mt-5'>
        <Link to="/auth/login" className='link mt-5'>
          Already registered?
        </Link>
      </div>
    </div>
  )
}
