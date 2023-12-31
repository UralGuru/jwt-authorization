import React, { FC, useContext, useState } from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

const Login: FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const { store } = useContext(Context)

    return (
        <div>
            <div>
                <input type="text"
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div>
                <input type="password"
                    placeholder='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>


            <button onClick={() => store.login(email || "", password || "")}>
                Login
            </button>
            <button onClick={() => store.registration(email || "", password || "")}>
                Registration
            </button>
        </div>
    )
};

export default observer(Login);