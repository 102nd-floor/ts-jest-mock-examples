import { mocked } from "ts-jest/utils";

import { helloWorld } from "../index";

const mockConsole = mocked(console, true);
mockConsole.log = jest.fn();

describe("hello world", () => {
  it("should print hello world in console", () => {
    helloWorld();
    expect(mockConsole.log).toBeCalledTimes(1);
  });
});
