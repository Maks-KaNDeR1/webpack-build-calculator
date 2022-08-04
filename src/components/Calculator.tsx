import React, { ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonBlock } from './Button/Button'
import './Calculator.css'


export const Calculator = () => {

    const digit = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', ',']
    const action = ['/', '*', '-', '+']

    let [a, setA] = useState<string>('')
    let [b, setB] = useState<string>('')
    let [sign, setSign] = useState<string>('')

    const [actionSum, setActionSum] = useState(false)
    const [focus, setFocus] = useState(false)

    const equality = () => {
        // if (b === '') setB(a)
        if (sign === '+') setA((Number(a) + Number(b)).toString())
        if (sign === '-') setA((Number(a) - Number(b)).toString())
        if (sign === '*') setA((Number(a) * Number(b)).toString())
        if (sign === '/') setA((Number(a) / Number(b)).toString())
    }

    const workWithEvents = useCallback((e: string) => {
        if (digit.includes(e)) {
            if (b === '' && sign === '') {
                setA(a += e)
                setActionSum(false)
            } if (a !== '' && b !== '') {
                setB(b += e)
                setActionSum(true)
                if (a !== '' && b === '') {
                    setActionSum(true)
                }
            } else if (sign !== '') {
                setB(b += e)
                setActionSum(true)
                if (a !== '' && b === '') {
                    setActionSum(true)
                }
            }
        }
        if (action.includes(e)) {
            setSign(sign = e)
        }
        if (e === '=') {
            equality()
        }
        if (e === '%') {
            setActionSum(true)
            let num = Number(a)
            let perc = num * 0.01
            setA((perc).toString())
        }
        if (e === '^') {
            setActionSum(true)
            setA(Math.sqrt(Number(a)).toString())
        }
        if (e === 'C') {
            if (b === '') {
                setA('')
                setSign('')
                setActionSum(false)
            } else {
                setB('')
            }
        }
        if (e === 'A') {
            if (b === '') {
                setA(a.slice(0, -2))
                setSign('')
                setActionSum(false)
            } else {
                setB(b.slice(0, -2))
            }
        }
    }, [a, b])

    const onClickHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setFocus(true)
        let e = event.currentTarget.value
        workWithEvents(e)
    }, [workWithEvents])

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value
        let e = value.length === 1 ? value : value.slice(-1)
        workWithEvents(e)
        // if (value < a) {
        //     // setA(value)
        //     workWithEvents(value)
        //     // setB(value)
        //     console.log(value)
        // } else if (value.length === 1){
        //     console.log(value.length)
        //     workWithEvents(value)
        // } else {
        //     console.log(value)
        //     workWithEvents(value.slice(-1))
        // }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            if (b !== '') {
                equality()
                setActionSum(true)
            }
        }
    }
    const onKeyDownHandler = (e: { code: string }) => {
        if (e.code === 'Escape') workWithEvents('C')
        if (e.code === "Backspace") workWithEvents('A')
    }

    const inputElement = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [focus]);


    return (
        <div className='mainBlock' >
            <div className='display' >
                {
                    actionSum ?
                        <div>
                            <div className='classSumValue'>
                                <input value={a} readOnly /><span>{sign}</span>
                            </div>
                            <div className='classSumTwoValue'>
                                <input ref={inputElement} onKeyPress={onKeyPressHandler} autoFocus
                                    onKeyDown={onKeyDownHandler} onChange={onChangeHandler} value={!b ? '0' : b} />
                            </div>
                        </div>
                        :
                        <div>
                            <div className='classSumValue'>
                                <input value={b} readOnly /><span>{sign}</span>
                            </div>
                            <div className='classValue'  >
                                <input ref={inputElement} onKeyPress={onKeyPressHandler} autoFocus
                                    onKeyDown={onKeyDownHandler} onChange={onChangeHandler} value={!a ? '0' : a} />
                            </div>
                        </div>
                }
            </div>
            <ButtonBlock onClickHandler={onClickHandler} />
        </div>
    )
}

