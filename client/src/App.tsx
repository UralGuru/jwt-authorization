import { useContext, useEffect } from 'react'
import './App.css'
import Login from './components/login'
import { Context } from './main'
import { observer } from 'mobx-react-lite';

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>
  };

  if (!store.isAuth) {
    return <Login />
  };

  return (
    <>
      <h1>Пользователь</h1>
      <h2>{`Профиль ${store.user.email}`}</h2>
      <button onClick={() => store.logout()}>Выйти</button>
    </>
  )
}

export default observer(App);
