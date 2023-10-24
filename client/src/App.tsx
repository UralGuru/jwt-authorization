import { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/login'
import { Context } from './main'
import { observer } from 'mobx-react-lite';
import { User } from './models/interfaces';
import UserService from './services/users.service';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  };

  if (!store.isAuth) {
    return (
      <>
        <Login />
        <div>
          <button onClick={getUsers}>Получить список пользователей</button>
        </div>

        <div>
          {
            users.map(user => {
              return <div key={user.id}>{user.id} {user.email}</div>
            })
          }
        </div>
      </>
    )
  };

  return (
    <>
      <h1>Пользователь</h1>
      <h2>{`Профиль ${store.user.email}`} </h2>
      <h2>{`Аккаунт подтвержден ${store.user.isActivated ? "✅" : "❌"}`} </h2>
      <button onClick={() => store.logout()}>Выйти</button>

      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>

      <div>
        {
          users.map(user => {
            return <div key={user.id}>{user.id} {user.email}</div>
          })
        }
      </div>
    </>
  )
}

export default observer(App);
