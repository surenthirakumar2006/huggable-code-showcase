const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImage(filePath) {
  try {
    const originalSize = fs.statSync(filePath).size;
    console.log(`Processing ${filePath}... Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    const tempPath = filePath + '.tmp';
    
    await sharp(filePath)
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 100
      })
      .toFile(tempPath);
      
    const newSize = fs.statSync(tempPath).size;
    console.log(`Compressed ${filePath}: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    
    if (newSize < originalSize) {
        fs.renameSync(tempPath, filePath);
    } else {
        console.log(`Compression didn't help for ${filePath}, keeping original.`);
        fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  const dir = path.join(__dirname, 'public/gal');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      await compressImage(path.join(dir, file));
    }
  }
}

main();
