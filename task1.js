  process.stdin
    .on('data', data => {
        // Reverse our string and remove any newlines
        var string = data
            .reverse()
            .toString()
            .split(/[\r\n|\n]/)
            .pop();

        // Return with newline
        console.log(string + '\n\n');
    });
