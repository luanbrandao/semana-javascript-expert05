import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 2049,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 3679792,
        size: 137066,
        blocks: 272,
        atimeMs: 1631581657584.61,
        mtimeMs: 1631581656972.609,
        ctimeMs: 1631581656972.609,
        birthtimeMs: 1631581656972.609,
        atime: "2021-09-14T01:07:37.585Z",
        mtime: "2021-09-14T01:07:36.973Z",
        ctime: "2021-09-14T01:07:36.973Z",
        birthtime: "2021-09-14T01:07:36.973Z",
      };

      const mockUser = "luanBrandao";
      process.env.USER = mockUser;
      const fileName = "file.png";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([fileName]);
        
        jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          // size: 137066,
          size: "137 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: fileName,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${fileName}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
