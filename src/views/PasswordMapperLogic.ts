const encoder = new TextEncoder();
function bytesToHex(bytes: Uint8Array) {
  const arr = Array.from(bytes);
  let result = "";
  arr.forEach((byte) => {
    result += byte.toString(16).padEnd(2, "0");
  });
  return result;
}

async function pwmap_old(
  keyword: string,
  algorithm: AlgorithmIdentifier = "sha-1"
) {
  const oriBuffer = encoder.encode(keyword);
  const hash = await crypto.subtle.digest(algorithm, oriBuffer);
  const hex = bytesToHex(new Uint8Array(hash));
  return btoa(hex);
}

const pw128 =
  "abcdefghijkm1234567890nopqrstuvwxyz1234567890ABCDEFGHIJKLM1234567890NOPQRSTUVWXYZ1234567890abcdefghijklm1234567890nopqrstuvwxyz";
console.log(pw128.length);
async function pwmap(keyword: string) {
  const buffer = encoder.encode(keyword);
  const hash = await crypto.subtle.digest("sha-256", buffer);
  let result = "";
  new Uint8Array(hash).forEach((byte) => {
    result += pw128.charAt(byte % 128);
  });
  return result;
}

export { pwmap, pwmap_old };
