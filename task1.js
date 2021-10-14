  var stdin = process.stdin;

  stdin.on('data', data => {
        // Reverse our string and remove any newlines
        // Return with newline
        console.log(data
          .reverse()
          .toString()
          .split(/[\r\n|\n]/)
          .pop() + '\n\n');
    });
