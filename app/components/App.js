import React from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Loading from './Loading';
import Notifications from './Notifications';

import { Auth, Hub } from 'aws-amplify';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { generateNotificationData, animateCSS } from './utils/helpers';
import {
  themeObj,
  CurrentUserContext,
  NotificationContext,
} from './context/context';

const Authenticate = React.lazy(() => import('./Auth'));

// FIX The light theme
export default function App() {
  const [theme, setTheme] = React.useState('dark');
  const [notifications, setNotifications] = React.useState([]);

  const [activeUser, setActiveUser] = React.useState({
    activeUser: null,
    authenticated: false,
  });

  React.useEffect(() => {
    const checkIfUserIsStillLoggedIn = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setActiveUser({ activeUser: currentUser, authenticated: true });
        createNotification(
          `Welcome Back! ${currentUser.username}`,
          'success',
          4000
        );
      } catch (error) {
        console.error('User is no longer logged in', error);
      }
    };

    Hub.listen('auth', data => {
      console.log(data);

      switch (data.payload.event) {
        case 'signIn':
        case 'signUp':
          setActiveUser({ activeUser: data.payload.data, authenticated: true });
          break;

        case 'signOut':
          setActiveUser({ activeUser: null, authenticated: false });
          createNotification(
            'You have logged out successfully',
            'success',
            5000
          );
          break;

        case 'signIn_failure':
          createNotification(data.payload.message, 'warning', 5000);
          break;
      }
    });

    // checkIfUserIsStillLoggedIn();
  }, []);

  const deleteNotification = id => {
    console.log('closing notification with id: ' + id);
    animateCSS(id, 'backOutRight').then(() => {
      setNotifications(prevArr => prevArr.filter(({ id: Id }) => Id !== id));
    });
  };

  const createNotification = (message, type, dismissTime) => {
    const singleNotificationObj = generateNotificationData(
      message,
      type,
      dismissTime
    );

    setNotifications(prev => [...prev, singleNotificationObj]);
  };

  return (
    <ThemeProvider theme={themeObj[theme]}>
      <NotificationContext.Provider
        value={{ createNotification, deleteNotification }}>
        <CurrentUserContext.Provider value={activeUser}>
          <div className={`theme-${theme}`}>
            <NavBar setTheme={setTheme} />
            <Notifications notificationList={notifications} />

            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>

                <Route path='/authenticate'>
                  <Authenticate authUser={setActiveUser} />
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </CurrentUserContext.Provider>
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}
