export function reverse() {
  const { stdin, stdout } = process;

  stdin.on("data", (buffer) => {
    const reversed = buffer.toString().split("").reverse().join("");
    stdout.write(reversed + "\n\n");
  });
}
