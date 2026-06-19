import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { formatDateTime } from '@/utils/dateFormat';

const NotesItem = ({ note, fromSearch }) => {

  const { slug, title, description, course, chapter, createdAt, } = note;
  const formattedDate = createdAt ? formatDateTime(createdAt) : '';

  return (
    <Card
      body
      className={
        fromSearch
          ? 'note-item bg-info text-white py-3 px-1 px-lg-3 my-2 my-lg-3'
          : 'note-item bg-secondary py-3 px-1 px-lg-3 my-2 my-lg-3'
      }
    >
      <CardTitle
        tag="h5"
        className={`mb-0 ${fromSearch ? 'text-white' : 'text-primary'
          } text-uppercase text-center`}
      >
        <Link to={`/view-note-paper/${slug}`}>{title && title}</Link>
      </CardTitle>

      <div className="d-flex justify-content-center fw-bold text-uppercase mb-1">
        <small className="text-muted text-xs mt-2">
          {course && course.title}&nbsp;({chapter && chapter.title})
        </small>
      </div>

      <CardText className="mt-1 details text-secondary d-inline-block text-center">
        <span className='capitalize-first'>
          {description && description}
        </span>
      </CardText>

      <div className="w-100 d-flex justify-content-around">
        <small className="me-2 me-md-5 my-1 text-dark">
          {formattedDate === 'Invalid date' ? '' : formattedDate}
        </small>
      </div>
    </Card>
  );
};

export default NotesItem;
