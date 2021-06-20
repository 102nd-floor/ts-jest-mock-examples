import { isObjectTooOld } from "../business";

// mock aws-sdk
const mockSend = jest.fn();

jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: class S3Client {
      send = () => mockSend();
    },
    GetObjectCommand: jest.fn(),
  };
});

describe("isS3ObjectTooOld", () => {
  it("should throw an error if object does not exist or last modified date is undefined", async () => {
    mockSend.mockReturnValueOnce({});
    try {
      await isObjectTooOld("");
    } catch (error) {
      expect(error).toEqual(new Error("oops, something went wrong"));
    }
  });
  it("should return true if file is modified before 2000-01-01", async () => {
    mockSend.mockReturnValueOnce({ LastModified: new Date("1999-01-01") });
    const tooOld = await isObjectTooOld("");
    expect(tooOld).toBe(true);
  });
  it("should return true if file is modified later than 2000-01-01", async () => {
    mockSend.mockReturnValueOnce({ LastModified: new Date("2010-01-01") });
    const tooOld = await isObjectTooOld("");
    expect(tooOld).toBe(false);
  });
});
