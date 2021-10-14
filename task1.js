var stdin = process.stdin;

// Reverse our string and remove any newlines
function transform(value) {
  output(
    value
      .reverse()
      .toString()
      .split(/[\r\n|\n]/)
      .pop()
  );
}

// Output our value with newlines
function output(value) {
  console.log(value + "\n\n");
}

// When 'data' event is ran, transform and output
stdin.on("data", transform);
