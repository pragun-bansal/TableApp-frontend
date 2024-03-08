const fs = require('fs-extra');

// Source directory of the build files
const buildDir = './build';

// Destination directory in the backend
const backendBuildDir = '../backend/views/build';

// Copy build files to the backend directory
fs.copy(buildDir, backendBuildDir, err => {
  if (err) {
    console.error('Error copying build files:', err);
  } else {
    console.log('Build files copied to backend.');
  }
});
