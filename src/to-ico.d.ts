declare module 'to-ico' {
  const toIco: (buffers: Buffer[] | Uint8Array[]) => Promise<Buffer>;
  export default toIco;
}
