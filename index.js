import express from 'express';

import { createCipheriv, createDecipheriv } from 'crypto';


const app = express()
const port = 3000


const algorithm = 'AES-128-ECB';
const encoding = 'utf8';
const output = 'hex';
const iv = null;

export function encrypt(criptoKey,value) {
  const key = Buffer.from(criptoKey, encoding);
  const cypher = createCipheriv(algorithm, key, iv);
  let encrypted = cypher.update(JSON.stringify(value), encoding, output);
  encrypted += cypher.final(output);
  return encrypted;
}

export function decrypt(criptoKey, encrypted) {
  const key = Buffer.from(criptoKey, encoding);
  const decypher = createDecipheriv(algorithm, key, iv);
  let decrypted = decypher.update(encrypted, output, encoding);
  decrypted += decypher.final(encoding);
  return JSON.parse(decrypted);
}

app.get('/', (req, res) => {

    var key = req.query.key
    var input = req.query.input

    var decrypted = decrypt(key, input)
    res.send({ "decrypted": decrypted})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})