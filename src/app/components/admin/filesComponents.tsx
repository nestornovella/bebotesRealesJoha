'use client'

import Styles from './styles.module.css'

export function Input({ label, type = 'text', name, value = '', handler }) {



    return (
        <div className="flex flex-col g ">
            <label className={`${Styles.label} text-sm translate-y-2.5 bg-white w-fit px-1 py-0 ml-2 font-bold text-gray-500`} htmlFor="">{label}</label>
            <input className={`${Styles.input} border rounded p-[4.8px] text-xs text-gray-600 font-semibold`} onChange={handler} value={value} name={name} type={type} />
        </div>
    )
}


// ::::::::TEXT AREA::::::::
export function TextArea({ label, name, value, handler, rows }) {



    return (
        <div className="flex flex-col g ">
            <label className={`${Styles.label} text-sm translate-y-2.5 bg-white w-fit px-1 ml-2 font-bold text-gray-500`} htmlFor="">{label}</label>
            <textarea rows={rows} className={`${Styles.input} border rounded p-[4.8px] text-xs text-gray-600 font-semibold`} onChange={handler} value={value} name={name} />
        </div>
    )
}


// ::::::::TEXT AREA::::::::
export function File({ callback }) {


    function handleChange(e) {
        const file = e.target.files[0];
        if (file) {
            callback(file);
        }
    }

    return (
        <div className="flex gap-1 text-xs items-center ">
            <label
                htmlFor="file-upload"
                className={`${Styles.label} text-sm mt-1  w-fit px-3 py-1 ml-2 font-bold cursor-pointer border rounded bg-blue-500 hover:bg-blue-600 text-white`}
            >
                Buscar imagen
            </label>
            <input
                onChange={
                    handleChange
                }
                id="file-upload"
                type="file"
            />
        </div>
    )
}


export function HeaderAdmin({ title }) {

    return (
        <div>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <hr />
        </div>
    )
}


export function ButtonBlue({ action, label, addClass = '' }) {
    return (
        <div className={`w-fit  ${addClass}`}>
            <button onClick={action}
                className={` text-sm bg-blue-400 text-white font-bold p-1 w-fit rounded cursor-pointer hover:bg-blue-500 block  ${addClass}`}>
                {label}</button>
        </div>
    )
}



