const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.ENCRYPT_KEY;
const iv = process.env.IV;
const tag = process.env.TAG;

const decryptSymmetric = (ciphertext) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm", 
      Buffer.from(key, 'base64'),
      Buffer.from(iv, 'base64')
    );
    
    decipher.setAuthTag(Buffer.from(tag, 'base64'));
  
    let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
    plaintext += decipher.final('utf8');
  
    return JSON.parse(plaintext);
  }
  
module.exports = decryptSymmetric