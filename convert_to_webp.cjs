const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImage(filePath) {
  try {
    const originalSize = fs.statSync(filePath).size;
    const webpPath = filePath.replace('.png', '.webp');
    
    await sharp(filePath)
      .webp({ lossless: false, quality: 95 })
      .toFile(webpPath);
      
    const newSize = fs.statSync(webpPath).size;
    console.log(`Converted ${filePath} to WebP: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  const dir = path.join(__dirname, 'public/comp');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      await convertImage(path.join(dir, file));
    }
  }
}

main();
