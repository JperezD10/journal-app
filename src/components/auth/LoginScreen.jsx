import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';

export const LoginScreen = () => {

  //para lanzar la accion de redux
  const dispatch = useDispatch();

  //para obtener los valores de redux
  const {msgError, isLoading} = useSelector( state => state.ui );

  useEffect(() => {
    dispatch( removeError() );

  }, [])
  

  const [ formValues, handleInputChange ] = useForm({
    email: 'jperezdemonty@gmail.com',
    password: '123456',
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if(isFormValid().length === 0){
      dispatch(removeError());
      //el dispatch es una funcion de react para lanzar la accion
      //el "startLoginEmailPassword" es la accion que creemos en el actions
      dispatch(startLoginEmailPassword(email, password));
    }
    else{
      dispatch(setError(isFormValid()));
    }
    
  }

  const isFormValid = () => {
    let error = [];
    if(!validator.isEmail(email)){
      error.push("Email not valid");
    }
    if(password.trim().length < 5){
      error.push("Password is required");
    }
    return error;
  }

  const handleGoogleLogin = (e) =>{
    e.preventDefault();
    dispatch(startGoogleLogin());
  }

  return (
    <div>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin}>
        {
          msgError && (
            <div className="auth__alert-error">
              <ul>
                {msgError.map( (err, index) => <li key={index}>{err}</li>)}
              </ul>
            </div>
          )
        }

        {
        /*
        ! si la propiedad "name" es distinta a lo que desestructure arriba de "formValues" no me va a dejar modificar el valor
        */}
        <input className='auth__input' autoComplete='off' type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} />
        <input className='auth__input' type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />

        <button type="submit" className='btn btn-primary btn-block' disabled = {isLoading}>
          Login
        </button>


        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to='/auth/register' className='link'>Create new account</Link>
      </form>

    </div>
  );
}
