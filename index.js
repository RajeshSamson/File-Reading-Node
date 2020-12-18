const fs = require('fs');
const dir = "C:\\Development\\Programming\\Ui\\node.js\\reading-file\\temp";
const SEARCH_KEY = "-}";

let readData = fs.readFile("raw.txt", "utf8", (err, data) => {
    if (err) {
        throw err;
    }
    let indices = locations(SEARCH_KEY, data);

    if (indices.length > 0 && indices.length < 3) {
        let content = data.substring(indices[0] + 2, indices[1] + 2);
    } else {
        return;
    }
    // Replace "GLARuS51xxxx", "CITIUS33xxxx"
    let replaceOperation1 = content.replace("GLARuS51xxxx", "CITIUS33xxxx");

    // Replace WFBIUS6TXXXX to GLARUS51XXXX
    let replaceOperation2 = replaceOperation1.replace("wFBIuS6Txxxx", "GLARUS51xxxx");

    // Replace 'O' with 'I'
    let number = replaceOperation2.indexOf("{2:") + 3;
    replaceOperation2 = replaceOperation2.substring(0, number) + 'I' + replaceOperation2.substring(number + 1);

    // Save the file.
    if (!fs.existsSync(dir)) {
        console.log("Temp directory created successfully...")
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + "\\raw-modified.txt", replaceOperation2.trim(), err1 => {
        if (err1) {
            console.log(err1);
        }
        console.log("Required file has be modified successfully...")
    });
});

/**
 * Function to find all the indices of the substring.
 * @param substring - Expression
 * @param string - Actual string
 * @returns {[]} - Returns an Array.
 */
function locations(substring, string) {
    let arr = [], i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) arr.push(i);
    return arr;
}


