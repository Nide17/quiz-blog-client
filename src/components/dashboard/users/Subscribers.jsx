import { useEffect } from 'react';
import { Row, Table, Col } from 'reactstrap';
import { getSubscribers, deleteSubscriber } from '@/redux/slices/subscribersSlice';
import { useSelector, useDispatch } from 'react-redux';
import QBLoadingSM from '@/utils/rLoading/QBLoadingSM';
import { formatDateTime } from '@/utils/dateFormat';
import DeleteModal from '@/utils/DeleteModal';
import Jumbotron from "@/utils/Jumbotron";

const Subscribers = () => {
    const { isLoading, subscribedUsers } = useSelector(state => state.subscribers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubscribers());
    }, [dispatch]);

    return (
        <div className="subscribers-section px-3 px-sm-4 py-3 py-sm-5 d-flex flex-column align-items-center">

            <Jumbotron
                h1="Subscribers List"
                p="These are all users who subscribed to Quiz-Blog updates, newsletters, and new quiz notifications."
            />

            <Row className="w-100 mt-4">
                {isLoading ? (
                    <QBLoadingSM title="subscribers" />
                ) : (
                    <Col sm="12" className="my-3">

                        {/* Empty State */}
                        {subscribedUsers.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                <h5>No subscribers found.</h5>
                                <p className="small">New subscribers will appear here.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table
                                    bordered
                                    hover
                                    striped
                                    size="sm"
                                    className="all-scores table-success"
                                >
                                    <thead className="text-uppercase table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subscription Date</th>
                                            <th><span role="img" aria-label="delete">❌</span></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {subscribedUsers.map((user, index) => {
                                            const { name, email, createdAt, _id } = user;
                                            const formattedDate = createdAt ? formatDateTime(createdAt) : '';

                                            return (
                                                <tr key={_id}>
                                                    <th className="table-dark">{index + 1}</th>

                                                    <td className="text-uppercase wrap-text">
                                                        {name?.split(' ').slice(0, 2).join(' ')}
                                                    </td>

                                                    <td className="text-lowercase wrap-text">
                                                        {email}
                                                    </td>

                                                    <td className="wrap-text">
                                                        <i>{formattedDate === 'Invalid date' ? '' : formattedDate}</i>
                                                    </td>

                                                    <td className="table-dark">
                                                        <DeleteModal
                                                            deleteFnName="deleteSubscriber"
                                                            deleteFn={deleteSubscriber}
                                                            delID={_id}
                                                            delTitle={name}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Subscribers;
