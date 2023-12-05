const fs = require('fs');
const path = require('path');

const folderPath = '/path/to/your/images'; // Update this with the actual path to your folder

// Read the contents of the folder
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

const filesReader= async ()=>{
    try {
        const files= await fs.readdir(folderPath)
        return files;
    }
    catch(err){
        console.error(err);
    }

}

    // Filter files to only include images (you can customize this based on your file extensions)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    console.log('Number of images in the folder:', imageFiles.length);

    // Now you can treat imageFiles as an array of image file paths
    // For example, you can use a loop to perform operations on each image
    for (const imageFile of imageFiles) {
        const imagePath = path.join(folderPath, imageFile);
        console.log('Processing image:', imagePath);

        // Add your image processing logic here
        // For example, you can use an image processing library like Sharp or Jimp
        // to manipulate or analyze the images.
    }
});
