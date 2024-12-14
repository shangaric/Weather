import inquirer from "inquirer"; // Prompt user for input
import qr from "qr-image"; // Generate QR code
import fs from "fs"; // Handle file system

// Create an async function to handle the QR code generation
const generateQRCode = async () => {
  try {
    // Prompt the user for the URL
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "url",
        message: "Enter the URL for the QR Code:",
      },
    ]);

    const url = answers.url;
    console.log("User URL input:", url);  // Debugging the input

    if (!url) {
      console.error("URL is required!");
      return;
    }

    // Generate QR code as a PNG stream
    const qrCode = qr.image(url, { type: "png" });

    if (!qrCode) {
      console.error("Failed to generate QR code.");
      return;
    }

    // Create a writable stream to save the file
    const output = fs.createWriteStream("qrcode.png");

    // Pipe the QR code stream to the output file
    qrCode.pipe(output);

    // Wait for the writing process to complete
    await new Promise((resolve, reject) => {
      output.on("finish", resolve);
      output.on("error", reject);
    });

    console.log("QR Code generated successfully! Saved as 'qrcode.png'.");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the function to generate the QR code
generateQRCode();
