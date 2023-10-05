import { useContext } from 'react';
import ReactLoading from 'react-loading';
import { ThemeContext } from '../context/NoteContext';

const LoadingBar = () => {
    const {Theme} = useContext(ThemeContext);
    return (
        <div className="loading-bar">
            <ReactLoading type="balls" color={Theme === 'light' ? '#333' : '#fff'}/>
        </div>
    )
}

export default LoadingBar;