import React, { MouseEvent } from 'react'
import './Button.css'

const items = [
    'C', '^', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '00', '0', ',', '=',
]

type PropsType = {
    onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ButtonBlock: React.FC<PropsType> = ({ onClickHandler }) => {
    return <>
        <hr className='partition' />
        <div className='buttonBlock' >
            {
                items.map(i => <button key={i} value={i} onClick={onClickHandler}
                    className={i === '=' ? 'alreadyStyles' : 'button'}
                > {i} </button>)
            }
        </div>
    </>
}

