import './LiveVideo.scss'
import Avatar from '../../Avatar/Avatar';
import React, { useState, useEffect } from "react"
import axios from "axios"

const LiveVideo = ({ liveVideo }) => {

    const [pic, setPic] = useState(liveVideo.profil);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${liveVideo.streamerId}`)
            .then(res => {
                setPic(res.data[0].photoUrl)
            })
    })



    const watchStream = (url, id, live, socket, streamedWith) => {
        localStorage.setItem("videoToWatch", url);
        localStorage.setItem("videoToWatchWithoutOBS", socket); 
        localStorage.setItem("streamToWatchId", id)
        localStorage.setItem("isLive", live);
        localStorage.setItem("streamedWith", streamedWith);
        window.location.href = process.env.REACT_APP_UI + 'streams/watch/';
    }
    return (
        <>
            <div className="live_video" onClick={() => watchStream(liveVideo.playbackUrl, liveVideo.streamId, liveVideo.live, liveVideo.socketId, liveVideo.streamedWith)}>
                { liveVideo.live ==="true" ? <div className="live_icon">Live</div> : <div></div>}
                <img src={liveVideo.miniature} alt="Live video" />
                <div className="flex">
                    <Avatar img={{ src: pic, size: "" }} />
                    <div className="live_infos">
                        <h5 className="live_title">{liveVideo.title}</h5>
                        <p className="username">{liveVideo.streamer}</p>
                        <p className="details">196k viewers - 20min ago</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LiveVideo;