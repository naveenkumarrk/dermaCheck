const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middlewares/authMiddleware');

// Ensure uploads directory existsa
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory:', uploadsDir);
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Upload destination:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = uniqueSuffix + ext;
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    console.log('File type accepted:', file.mimetype);
    cb(null, true);
  } else {
    console.log('File type rejected:', file.mimetype);
    cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Handle image upload
const uploadImage = async (req, res) => {
  console.log('Starting file upload process');
  
  // Use multer middleware
  upload.single('file')(req, res, async function(err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ 
        message: err.message || 'File upload error' 
      });
    }
    
    // Check if file was provided
    if (!req.file) {
      console.error('No file was uploaded');
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    console.log('File uploaded successfully:', req.file);
    
    try {
      // Get server base URL (for accessing the image)
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      
      // Create image record in database
      const image = new Image({
        filename: req.file.originalname,
        storedFilename: req.file.filename,
        userId: req.user.id,
        uploadDate: new Date(),
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: imageUrl
      });

      const savedImage = await image.save();
      console.log('Image saved to database:', savedImage._id);

      // Send response back to client
      res.status(201).json({ 
        message: 'Image uploaded successfully',
        image: {
          id: savedImage._id,
          filename: savedImage.filename,
          uploadDate: savedImage.uploadDate,
          url: savedImage.url
        }
      });
    } catch (error) {
      console.error('Database save error:', error);
      
      // If database save fails, delete the uploaded file to prevent orphaned files
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        console.log('Deleting uploaded file due to database save error:', req.file.path);
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({ 
        message: 'Upload failed', 
        error: error.message 
      });
    }
  });
};

// Prediction endpoint
const predictImage = async (req, res) => {
  try {
    const { imageId } = req.body;
    
    if (!imageId) {
      return res.status(400).json({ message: 'Image ID is required' });
    }
    
    // Find the image in the database
    const image = await Image.findById(imageId);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Placeholder for prediction logic
    // In a real app, you'd call your ML model here
    const predictionResult = {
      imageId: image._id,
      prediction: "Sample prediction",
      confidence: 0.85,
      timestamp: new Date()
    };
    
    // Update the image with analysis results
    image.analysis = predictionResult;
    await image.save();
    
    res.status(200).json({
      success: true,
      data: predictionResult
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing image',
      error: error.message
    });
  }
};

// Get user's images
const getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id }).sort({ uploadDate: -1 });
    
    res.status(200).json({
      success: true,
      count: images.length,
      data: images.map(img => ({
        id: img._id,
        filename: img.filename,
        uploadDate: img.uploadDate,
        url: img.url,
        analysis: img.analysis || null
      }))
    });
  } catch (error) {
    console.error('Get user images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images',
      error: error.message
    });
  }
};

// Define routes
router.post('/upload', protect, uploadImage);
router.post('/predict', protect, predictImage);
router.get('/images', protect, getUserImages);

module.exports = router;