import './Spinner.scss';
import {
    ImSpinner9
} from 'react-icons/im'

const Spinner = () => {
    return (
        <div className="spinner">
            <ImSpinner9 className="icon" />
            Loading...
        </div>
    );
}
 
export default Spinner;