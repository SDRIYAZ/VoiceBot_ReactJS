import React from 'react'
import axios from 'axios';

const Sample = () => {

    const handleClick = async () => {
        const response = await axios.post("http://127.0.0.1:8000/process_video", {
            video_file: "123",
            mobile_number: "09876789876",
            child_no:"1"
        });
        console.log(response)
    }
    return (
        <div>
            <button onClick={handleClick}>POST</button>
        </div>
    )
}

export default Sample
