function bytesToHex(bytes: Uint8Array) {
  const arr = Array.from(bytes);
  let result = "";
  arr.forEach((byte) => {
    result += byte.toString(16).padEnd(2, "0");
  });
  return result;
}

async function pwmap(
  keyword: string,
  algorithm: AlgorithmIdentifier = "sha-1"
) {
  const oriBuffer = new TextEncoder().encode(keyword);
  const hash = await crypto.subtle.digest(algorithm, oriBuffer);
  const hex = bytesToHex(new Uint8Array(hash));
  return btoa(hex);
}

export { pwmap };
