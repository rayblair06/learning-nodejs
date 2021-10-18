const reader = process.stdin;

// Reverse our string and remove any newlines
function transform(value) {
  let transformed = value
    .reverse()
    .toString()
    .split(/[\r\n|\n]/)
    .pop();

  output(
    transformed
  );
}

// Output our value with newlines
function output(value) {
  console.log(value + "\n\n");
}

// When 'data' event is ran, transform and output
reader.on("data", transform);
