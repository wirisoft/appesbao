// src/app/utils/utils.ts

export function stringToByteArray(str: string): Uint8Array {
    return new TextEncoder().encode(str);
  }
  
  export function byteArrayToString(byteArray: Uint8Array): string {
    return new TextDecoder().decode(byteArray);
  }
  