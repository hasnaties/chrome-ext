const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure icons directory exists
if (!fs.existsSync('icons')) {
    fs.mkdirSync('icons');
}

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Fill with a gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#45a049');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Add a letter 'T' in the center
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('T', size/2, size/2);

    // Save the icon
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join('icons', `icon${size}.png`), buffer);
}

// Generate icons in all required sizes
[16, 48, 128].forEach(generateIcon);