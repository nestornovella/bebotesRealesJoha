import { ButtonBlue, HeaderAdmin, Input } from '@/app/components/admin/filesComponents';
import { useAuthStore } from '@/app/store/auth.store';
import React, { useState } from 'react';

const AuthSection = () => {

    const {setPass} = useAuthStore()

    const [input, setInput] = useState({
        pass: ''
    })


    function handleInput (e: React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value 
        const name = e.target.name

        setInput(prev => ({...prev, [name]: value}))
    }

    function submit(){
        setPass(input.pass)
    }

    return (
        <div className=' pt-20 flex flex-col items-center justify-center'>
            <HeaderAdmin title={'Pass Access'}/>

            <Input handler={handleInput} label={'PassWord'} name={'pass'}  type='password' value={input.pass}/>

            <ButtonBlue action={submit} label={'Ingresar'} />
        </div>
    );
};

export default AuthSection;