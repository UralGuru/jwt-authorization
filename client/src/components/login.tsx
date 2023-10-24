import React, { FC, useState } from 'react';

const Login: FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

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


            <button>Login </button>
            <button>Registration </button>
        </div>
    )
};

export default Login;