process.stdin.on("data", (line) => {
  const reversedLine = line.toString().split("").reverse().join("");
  process.stdout.write(reversedLine + "\n\n");
});
