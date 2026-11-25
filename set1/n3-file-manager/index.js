// Name: Diana C. Esguerra
// Activity: N3 - File Manager

const fs = require("fs");
const path = require("path");

const filesFolder = path.join(__dirname, "files");

if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
}

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv[4];

const filePath = path.join(filesFolder, fileName || "");

switch (command) {
    case "create":
        if (!fileName || !content) {
            console.log("Please provide a file name and content.");
            break;
        }

        if (fs.existsSync(filePath)) {
            console.log("File already exists.");
            break;
        }

        fs.writeFileSync(filePath, content);
        console.log("File created successfully!");
        break;

    case "read":
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist.");
            break;
        }

        console.log("\nFile Content:");
        console.log(fs.readFileSync(filePath, "utf8"));
        break;

    case "update":
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist.");
            break;
        }

        if (!content) {
            console.log("Please provide text to append.");
            break;
        }

        fs.appendFileSync(filePath, "\n" + content);
        console.log("File updated successfully!");
        break;

    case "delete":
        if (!fs.existsSync(filePath)) {
            console.log("File does not exist.");
            break;
        }

        fs.unlinkSync(filePath);
        console.log("File deleted successfully!");
        break;

    case "list":
        const files = fs.readdirSync(filesFolder);

        if (files.length === 0) {
            console.log("No files found.");
            break;
        }

        console.log("\n===== FILE LIST =====");

        files.forEach((file) => {
            const currentPath = path.join(filesFolder, file);
            const stats = fs.statSync(currentPath);

            if (stats.isFile()) {
                console.log("\nFull Path:", currentPath);
                console.log("File Name:", path.basename(file));
                console.log("Extension:", path.extname(file));
                console.log("Contents:");
                console.log(fs.readFileSync(currentPath, "utf8"));
            }
        });
        break;

    default:
        console.log("Invalid command.");
        console.log("\nAvailable commands:");
        console.log("create <filename> <content>");
        console.log("read <filename>");
        console.log("update <filename> <content>");
        console.log("delete <filename>");
        console.log("list");
}
