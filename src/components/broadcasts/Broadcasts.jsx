import React, { useEffect, useContext } from 'react'
import { Row, Alert } from 'reactstrap'
import { getBroadcasts } from '../../redux/slices/broadcastsSlice'
import { useSelector, useDispatch } from "react-redux"
import BroadcastsCard from './BroadcastCard'
import QBLoadingSM from '../rLoading/QBLoadingSM'
import { authContext } from '../../appContexts'

const Broadcasts = () => {

    const dispatch = useDispatch()
    const broadcasts = useSelector(state => state.broadcasts)

    const auth = useContext(authContext)
    const broadcastsToUse = broadcasts && broadcasts.allBroadcasts

    // Lifecycle methods
    useEffect(() => {
        dispatch(getBroadcasts())
    }, [dispatch])

    const currentUser = auth && auth.user
    const curUserRole = currentUser && currentUser.role

    return (
        curUserRole === 'Admin' || curUserRole === 'SuperAdmin' ?
                <div className='mx-4 my-5'>
                    {broadcasts.isLoading ?
                        <QBLoadingSM title='broadcasts' /> :

                        <Row>
                            <BroadcastsCard
                                broadcastsToUse={broadcastsToUse} />
                        </Row>
                    }

                </div> : <Alert color="danger">Access Denied!</Alert>
    )
}

export default Broadcasts