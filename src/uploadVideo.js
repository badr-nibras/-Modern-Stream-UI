import AWS from 'aws-sdk'


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
})

export function upload(blob, id) {


    const params = {
        ACL: 'public-read',
        Body: blob,
        Bucket: 'rtcbucketunauth',
        Key: `video-${id}.webm`
    };

    s3.putObject(params)
        .on('httpUploadProgress', (evt) => {
            console.log(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })

}