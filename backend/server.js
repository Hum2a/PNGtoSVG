const express = require('express');
const multer = require('multer');
const potrace = require('potrace');
const sharp = require('sharp');
const Jimp = require('jimp');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// PNG to SVG Endpoint
app.post('/convert', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    const outputSvgPath = `uploads/${Date.now()}.svg`;

    potrace.trace(filePath, { color: 'black' }, (err, svg) => {
        if (err) {
            console.error('Potrace Error:', err);
            return res.status(500).json({ error: 'Conversion failed' });
        }

        // Save the SVG to a file
        fs.writeFileSync(outputSvgPath, svg, 'utf8');
        console.log('SVG saved at:', outputSvgPath);

        // Return the file URL
        res.json({ url: `http://localhost:3000/${outputSvgPath}` });
    });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
