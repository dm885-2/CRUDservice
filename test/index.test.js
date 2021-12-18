import {jest} from '@jest/globals';
import {createFile, readFile, updateFile, deleteFile, getAllFiles} from '../src/index.js';
import helpers from '../src/helpers.js';

const userId = 1;
const filetype = "mzn";
const sessionId = 1;
const requestId = 1;

// Mock functions.
helpers.query = jest.fn();
const publishFn = jest.fn();

describe('CRUD Service', () => {

  beforeEach(async () => {
    helpers.query.mockClear();
    publishFn.mockClear();
  });

  /** GET ALL */
  it('should query the database when requesting the files.', async () => {
    // Call the getAllFiles function.
    const msg = {sessionId: sessionId, requestId: requestId, userId: userId, filetype: filetype};
    await getAllFiles(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  it('should publish the response when requesting the files.', async () => {
    // Mock the functions.
    const files = [{id: 1, filename: 'foo.mzn', userId: userId, filetype: filetype}];
    helpers.query.mockReturnValueOnce(files);

    // Call the getFiles function.
    const msg = {sessionId: sessionId, requestId: requestId, userId: userId, filetype: filetype};
    await getAllFiles(msg, publishFn);

    // Check that it queried the database.
    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('get-all-files-response', {
      error: false,
      results: files
    });
  });

  /** DELETE */
  it('should query the database when deleting a file.', async () => {
    // Call the deleteFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1};
    await deleteFile(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  it('should publish the response when deleting a file.', async () => {
    // Mock the functions.
    helpers.query.mockReturnValueOnce(true);

    // Call the deleteFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1};
    await deleteFile(msg, publishFn);

    // Check that it queried the database.
    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('delete-file-response', {
      error: false,
      message: "File deleted succesfully"
    });
  });

  /** UDPDATE */
  it('should query the database when updating a file.', async () => {
    // Call the updateSolver function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1, data: 'baz'};
    await updateFile(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  it('should publish the response when updating a file.', async () => {
    // Mock the functions.
    helpers.query.mockReturnValueOnce(true);

    // Call the updateSolver function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1, data: 'baz'};
    await updateFile(msg, publishFn);

    // Check that it queried the database.
    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('update-file-response', {
      error: false,
      message: "File updated successfully"
    });
  });

  /** CREATE */
  it('should query the database when creating a file.', async () => {
    // Call the createFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1, data: 'baz'};
    await createFile(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  it('should publish the response when creating a file.', async () => {
    // Mock the functions.
    helpers.query.mockReturnValueOnce(true);

    // Call the createFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 2, data: 'baz2', filename: "foo", filetype: filetype};
    await createFile(msg, publishFn);

    // Check that it queried the database.
    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('create-file-response', {
      error: false,
      message: "File created successfully.",
      filetype: filetype,
      filename: "foo"
    });
  });

  /** READ */
  it('should query the database when reading a file.', async () => {
    // Call the readFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1, data: 'baz'};
    await readFile(msg, publishFn);

    // Check that it queried the database.
    expect(helpers.query).toHaveBeenCalledTimes(1);
  });

  it('should publish the response when reading a file.', async () => {
    // Mock the functions.
    const files = [{id: 1, filename: 'foo.mzn', data: "baz", userId: userId, filetype: filetype}];
    helpers.query.mockReturnValueOnce(files);

    // Call the readFile function.
    const msg = {sessionId: sessionId, requestId: requestId, fileId: 1};
    await readFile(msg, publishFn);

    // Check that it queried the database.
    expect(publishFn).toHaveBeenCalledTimes(1);
    expect(publishFn).toHaveBeenCalledWith('read-file-response', {
      error: false,
      data: "baz",
      filename: "foo.mzn",
      filetype: filetype
    });
  });
});
