import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
    const userLogin = useSelector(state => state.UserReducer.userLogin)
    return (
        <div>
            {userLogin?.name}
        </div>
    )
}
