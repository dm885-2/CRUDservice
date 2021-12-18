import helpers from "./helpers.js";

export async function createFile(msg, publish) {
    let filename = msg.filename;
    let data = msg.data;
    let userId = msg.userId;
    let filetype = msg.filetype;

    let query = `INSERT INTO files(filename,data,userid,filetype)
                    VALUES(?,?,?,?)`;
    
    let params = [filename, data, userId, filetype];

    const results = await helpers.query(query, params);
    if(!results) {
        publish('create-file-response', {error: true, message: "Could not create file"});
        return;
    }                     
    publish('create-file-response', {error: false, message: "File created successfully.", filename: filename, filetype: filetype})
} 

export async function readFile(msg, publish) {
    let fileId = msg.fileId;
    let query = 'SELECT * FROM files WHERE fileId=?';

    const results = await helpers.query(query, [fileId]);
    if(!results ||  Object.keys(results).length === 0) {
        publish('read-file-response', {error: true, message: "File not found"});
        return;
    }
    publish('read-file-response', {error: false, filename: results[0].filename, filetype: results[0].filetype, data: results[0].data})
}

export async function updateFile(msg, publish) {
    let fileId = msg.fileId;
    let data = msg.data;
    
    let query = `UPDATE files
                    SET data = ?
                    WHERE fileId = ?`;
    let params = [data, fileId];

    const results = await helpers.query(query, params);
    if(!results) {
        publish('update-file-response', {error: true, message: "Could not update file"});
        return;    
    }
    publish('update-file-response', {error: false, message: "File updated successfully"})
}

export async function deleteFile(msg, publish) {
    let fileId = msg.fileId;
                
    let query = `DELETE FROM files WHERE fileId = ?`

    const results = await helpers.query(query, [fileId]);
    if(!results) {
        publish('delete-file-response', {error: true, message: "Could not delete file"});
        return;
    }
    publish('delete-file-response', {error: false, message: "File deleted succesfully"})
}

export async function getAllFiles(msg, publish) {
    let userId = msg.userId;
    let filetype = msg.filetype;

    let query = 'SELECT * FROM files WHERE userId=? AND filetype = ?';

    const results = await helpers.query(query, [userId, filetype]);
    if(!results) {
        publish('get-all-files-response', {error: true, message: "Could not get all files"});
        return;    
    }
    var files = [];
    results.forEach(element => {
        files.push(omit("data", element));
    });
    publish('get-all-files-response', {error: false, results: files});
}

if(process.env.RAPID)
{
    helpers.subscriber(helpers.host, [
        { river: "CRUD", event: "create-file", work: createFile },
        { river: "CRUD", event: "read-file", work: readFile },
        { river: "CRUD", event: "update-file", work: updateFile },
        { river: "CRUD", event: "delete-file", work: deleteFile },
        { river: "CRUD", event: "get-all-files", work: getAllFiles }
    ])
}

function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }