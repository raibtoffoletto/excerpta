export default function codeGen() {
  const rand = () => Math.random() * 128;

  return Buffer.from(`${rand()}${rand()}`).toString('base64');
}
