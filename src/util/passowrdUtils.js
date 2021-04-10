import CryptoJS from 'crypto-js'

const key = "THISISUGOSPASSWORDHEADER"

export function encoded(raw) {
  let encodedKey = CryptoJS.enc.Utf8.parse(key)
  let encodedPassword = CryptoJS.AES.encrypt(raw, encodedKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  return encodedPassword;
}