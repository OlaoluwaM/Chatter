import React from 'react';
import Home from './Home';
import NavBar from './NavBar';
import Loading from './Loading';
import Notifications from './Notifications';

import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { generateNotificationData } from './utils/helpers';
import {
  themeObj,
  CurrentUserContext,
  NotificationContext,
} from './context/context';

const Authenticate = React.lazy(() => import('./Auth'));

export default function App() {
  const [notifications, setNotifications] = React.useState([]);

  const [activeUser, setActiveUser] = React.useState({
    activeUser: null,
    authenticated: false,
  });

  const deleteNotification = id => {
    console.log('closing notification with id: ' + id);
    setNotifications(prevArr => prevArr.filter(({ id: Id }) => Id !== id));
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
    <ThemeProvider theme={themeObj}>
      <NotificationContext.Provider
        value={{ createNotification, deleteNotification }}>
        <CurrentUserContext.Provider value={activeUser}>
          <div>
            <NavBar />
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
