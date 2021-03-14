export function ioObserver() {
  process.stdin.on("data", (buffer) => {
    const reversed = buffer.toString().split("").reverse().join("");
    process.stdout.write(reversed + "\n\n");
  });
}
