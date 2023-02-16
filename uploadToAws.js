const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const REGION = "ap-northeast-1";
const s3 = new S3({
  region: REGION,
  credentials: {
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET_NAME;

module.exports.uploadToAws = async (file) => {
  try {
    const imagePath = file.path;

    const blob = fs.readFileSync(imagePath);

    const params = {
      Bucket: BUCKET,
      Key: file.originalFilename.replace(/\s+/g, ""),
      Body: blob,
    };

    const uploadedFile = await s3.send(new PutObjectCommand(params));

    return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
  } catch ({ message }) {
    return message;
  }
};
