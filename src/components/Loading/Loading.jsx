import React from 'react'
import { useSelector } from 'react-redux'
import styleLoading from './Loading.module.css'

export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducers);
    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={require('../../assets/img/loading.gif')} alt="..." />
            </div>
        )
    } else {
        return ''
    }
}
