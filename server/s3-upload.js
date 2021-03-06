const AWS = require('aws-sdk');
const Busboy = require('busboy');

BUCKET_NAME = (process.env.BUCKET_NAME);
IAM_USER_KEY = (process.env.IAM_USER_KEY);
IAM_USER_SECRET = (process.env.IAM_USER_SECRET);

module.exports = app => {
    app.post('/api/upload', (req, res) => {
        const element1 = req.body.element1;
        var busboy = new Busboy({ headers: req.headers });

        console.log('element1: ')
        console.log(element1)

        busboy.on('finish', function() {
            console.log('Upload finished')

            console.log('files: ')
            console.log(req.files)

        const file = req.files.element2;
        console.log(file)

        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
        });
        s3bucket.createBucket(function() {
            var params = {
                Bucket: BUCKET_NAME,
                Key: file.name,
                Body: file.data
            };
            s3bucket.upload(params, function(err, data) {
                if(err) {
                    console.log('error in callback')
                    console.log(err)
                }
                console.log('success')
                console.log(data)
            })
        })
        })
        req.pipe(busboy)
    } )
}