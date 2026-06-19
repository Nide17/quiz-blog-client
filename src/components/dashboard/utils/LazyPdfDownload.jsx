import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './pdfs/PdfDocument';

const LazyPdfDownload = ({ review, fileName, children, ...props }) => (
  <PDFDownloadLink
    document={<PdfDocument review={review} />}
    fileName={fileName}
    {...props}
  >
    {children}
  </PDFDownloadLink>
);

export default LazyPdfDownload;