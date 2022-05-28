import React, { useEffect, useState } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  //#region validacion de autenticacion
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged( (user) => {
      
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);
      }
      else{
        setIsLogged(false);
      }

      setChecking(false);

    });

  }, [dispatch, setChecking])
  //#endregion

  //esto lo hago como "pantalla de carga" mientras busca en firebase la respueta
  if (checking) {
    return <div>Loading...</div>
  }

  return (
    <Router>
        <div>
            <Switch>
                <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLogged} />
                <PrivateRoute path="/" component={JournalScreen} isAuthenticated={isLogged} />
                <Redirect to="/auth/login" />
            </Switch>
        </div>
    </Router>
  )
}
