import './RecordVideo.scss'

const RecordVideo = ({recordVideo}) => {
    return (
        <>
            <div className="record_video" onClick={() => {
                window.location.href = '/streams/watch';
            }}>
                <img src={recordVideo.miniature} alt="Record video"/>
                <div className="record_infos">
                    <h5 className="record_title">{recordVideo.title} !</h5>
                    <p className="details">196k seens - 2 days ago</p>
                </div>
            </div>
        </>
    );
}
 
export default RecordVideo;