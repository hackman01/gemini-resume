const http = require('https');
const fs = require('fs');

const downloadFile = async (url) => { 

    const destination = `file-${Date.now()}.pdf`;
    const file = fs.createWriteStream(`${__dirname}/file-${Date.now()}.pdf`);

    const chk = url.substring(url.length - 4);

    if(chk!==".pdf"){
        return undefined;
    }


    let downloadPromise = new Promise(function(resolve, reject) {
        // "Producing Code" (May take some time)
        
        http.get(url,(response)=>{
            response.pipe(file);
            file.on('finish',()=>{
                file.close(()=>{
                    console.log("Download Successful!");
    
            
                });
                resolve(destination);
                
            })
        }).on('error',(err)=>{
            fs.unlink(destination,()=>{
                console.log(err);
            })
            reject();
        })
        })
    try{
      const res = await downloadPromise;
      return res;
    }catch(error){
        console.log(error);
        return 
    }
      
}

module.exports = downloadFile;