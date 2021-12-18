import helpers from "./helpers.js";

export async function createFile(msg, publish) {
    let filename = msg.filename;
    let data = msg.data;
    let userId = msg.userId;
    let filetype = msg.filetype;

    let query = `INSERT INTO files(filename,data,userid,filetype)
                    VALUES(?,?,?,?)`;
    
    let params = [filename, data, userId, filetype];

    await helpers.query(query, params, (error, results) => {
        if (error) {
            publish('create-file-response', {error: true, message: error.code});
            return;
        }
    });                         
    publish('create-file-response', {error: false, message: "File created successfully.", filename: filename, filetype: filetype})
} 

export async function readFile(msg, publish) {
    let fileId = msg.fileId;
    let query = 'SELECT * FROM files WHERE fileId=?';

    const results = await helpers.query(query, [fileId], (error, results) => {
        if(error || Object.keys(results).length === 0) {
            publish('read-file-response', {error: true, message: "File not found", errormessage: error.code});
            return;
        }
    });
    if(results)
        publish('read-file-response', {error: false, filename: results[0].filename, filetype: results[0].filetype, data: results[0].data})
}

export async function updateFile(msg, publish) {
    let fileId = msg.fileId;
    let data = msg.data;
    
    let query = `UPDATE files
                    SET data = ?
                    WHERE fileId = ?`;
    let params = [data, fileId];

    await helpers.query(query, params, (error, results) => {
        if(error) {
            publish('update-file-response', {error: true, message: "File not found", errormessage: error.code});
            return;
        }
    });  
    publish('update-file-response', {error: false, message: "File updated successfully"})
}

export async function deleteFile(msg, publish) {
    let fileId = msg.fileId;
                
    let query = `DELETE FROM files WHERE fileId = ?`

    const results = await helpers.query(query, [fileId], (error, results) => {
        if(error) {
            publish('delete-file-response', {error: true, message: error.code});
            return;
        }
    });
    publish('delete-file-response', {error: false, message: "File deleted succesfully"})
}

export async function getAllFiles(msg, publish) {
    let userId = msg.userId;
    let filetype = msg.filetype;

    let query = 'SELECT * FROM files WHERE userId=? AND filetype = ?';

    const results = await helpers.query(query, [userId, filetype], (error, results) => {
        if(error) {
            publish('get-all-files-response', {error: true, message: error.code});
            return;
        }
    }); 
    if(results) {
        var files = [];
        results.forEach(element => {
            files.push(omit("data", element));
        });
        publish('get-all-files-response', {error: false, results: files});
    }
}

if(process.env.RAPID)
{
    helpers.subscriber(host, [
        {
            river: "CRUD", 
            event: "create-file", 
            work: (msg, publish) => createFile
        },
        {
            river: "CRUD",
            event: "read-file",
            work: (msg, publish) => readFile
        },
        {
            river: "CRUD",
            event: "update-file",
            work: (msg, publish) => updateFile
        },
        {
            river: "CRUD",
            event: "delete-file",
            work: (msg, publish) => deleteFile
        },
        {
            river: "CRUD",
            event: "get-all-files",
            work: (msg, publish) => getAllFiles
        },
    ]);
}

function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }