import { put } from '@vercel/blob';
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// You'll need to set this environment variable
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('Please set BLOB_READ_WRITE_TOKEN environment variable');
  process.exit(1);
}

const assetsDir = join(__dirname, '../src/assets');
const travelDir = join(assetsDir, 'travel');

async function uploadFile(filePath, fileName) {
  try {
    const fileBuffer = readFileSync(filePath);
    const blob = await put(fileName, fileBuffer, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
    });
    
    console.log(`✅ Uploaded: ${fileName} -> ${blob.url}`);
    return { fileName, url: blob.url };
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error);
    return null;
  }
}

async function uploadAssets() {
  const uploadedFiles = {};
  
  console.log('🚀 Starting asset upload to Vercel Blob...\n');
  
  // Upload main assets
  const mainAssets = [
    'amankhilani.jpg', 
    'ku-star.jpg',
    'driver-gaze.png',
    'surge-lidar.jpg',
    'antaragni.jpg',
    'inter-iit.jpg',
    'film-club.jpg',
  ];
  
  for (const asset of mainAssets) {
    const filePath = join(assetsDir, asset);
    try {
      const result = await uploadFile(filePath, asset);
      if (result) {
        uploadedFiles[asset] = result.url;
      }
    } catch (error) {
      console.log(`⚠️ Skipping ${asset} (file not found)`);
    }
  }
  
  // Upload travel photos
  try {
    const travelFiles = readdirSync(travelDir).filter(file => 
      ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(file).toLowerCase())
    );
    
    console.log(`\n📸 Uploading ${travelFiles.length} travel photos...\n`);
    
    for (const file of travelFiles) {
      const filePath = join(travelDir, file);
      const result = await uploadFile(filePath, `travel/${file}`);
      if (result) {
        uploadedFiles[`travel/${file}`] = result.url;
      }
    }
  } catch (error) {
    console.log('⚠️ Travel directory not found, skipping travel photos');
  }
  
  // Generate config file
  const configContent = `// Auto-generated asset URLs from Vercel Blob
export const ASSET_URLS = ${JSON.stringify(uploadedFiles, null, 2)};
`;
  
  const { writeFileSync } = await import('fs');
  writeFileSync(join(__dirname, '../src/assetUrls.js'), configContent);
  
  console.log('\n✅ Upload complete!');
  console.log(`📁 Generated asset config at: src/assetUrls.js`);
  console.log(`🗂️ Total files uploaded: ${Object.keys(uploadedFiles).length}`);
}

uploadAssets().catch(console.error);
