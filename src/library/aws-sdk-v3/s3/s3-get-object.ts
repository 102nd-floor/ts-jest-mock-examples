// Import required AWS SDK clients and commands for Node.js.
import { GetObjectCommandOutput, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-client";

// Set the parameters
const params = {
  Bucket: "BUCKET_NAME", // The name of the bucket. For example, 'sample_bucket_101'.
};

export const getObject = async (
  objectKey: string
): Promise<GetObjectCommandOutput> => {
  // Read an object from Amazon S3 bucket.
  const data = await s3Client.send(
    new GetObjectCommand({ Bucket: params.Bucket, Key: objectKey })
  );
  return data;
};
