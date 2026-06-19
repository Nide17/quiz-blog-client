import { useEffect } from 'react';
import { Row, Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getBroadcasts } from '@/redux/slices/broadcastsSlice';
import Jumbotron from "@/utils/Jumbotron";
import BroadcastsCard from './BroadcastCard';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';

const Broadcasts = () => {
    const dispatch = useDispatch();

    const { allBroadcasts = [], isLoading } = useSelector(state => state.broadcasts);
    const { user } = useSelector(state => state.users);

    const curUserRole = user?.role || [];

    useEffect(() => {
        dispatch(getBroadcasts());
    }, [dispatch]);


    if (!curUserRole.includes('Admin')) {
        return <Alert color="danger">Access Denied!</Alert>;
    }


    return (
        <div className="broadcasts-section px-3 px-sm-4 py-3 py-sm-5 d-flex flex-column align-items-center">
            <Jumbotron
                h1="Broadcasts"
                p="These are all broadcasts sent to users across the Quiz-Blog platform."
            />

            {isLoading ? (
                <QBLoadingSM title="broadcasts" />
            ) : (
                <Row className="w-100 mt-4">
                    {allBroadcasts.length === 0 ? (
                        <div className="text-center py-5 text-muted w-100">
                            <h5>No broadcasts found.</h5>
                            <p className="small">New broadcasts will appear here.</p>
                        </div>
                    ) : (
                        <BroadcastsCard broadcastsToUse={allBroadcasts} />
                    )}
                </Row>
            )}
        </div>
    );
};

export default Broadcasts;
