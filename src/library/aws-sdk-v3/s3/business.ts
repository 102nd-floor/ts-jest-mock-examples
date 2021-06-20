import { getObject } from "./s3-get-object";

export const isObjectTooOld = async (
  objectKey: string
): Promise<boolean | undefined> => {
  const tooOldDate = new Date("2000-01-01");

  const { LastModified } = await getObject(objectKey);
  if (LastModified) {
    return +LastModified - +tooOldDate < 0;
  }

  throw new Error("oops, something went wrong");
};
