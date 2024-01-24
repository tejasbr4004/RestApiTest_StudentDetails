const multer=require('multer');
const path = require('path');
const fs = require('fs');


const uploadDirectory = path.join(__dirname, './uploads/');

// Check if the 'uploads' directory exists, create it if not
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdir(uploadDirectory, (err) => {
        if (err) {
            console.error('Error creating uploads directory:', err);
        } else {
            console.log('Uploads directory created successfully.');
        }
    });
}


const sanitizeFilename = (filename) => {
    // Implement logic to sanitize the filename
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};


const fileFilter = function (req,file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg|pdf|txt|doc|docx|xls|xlsx/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("You can only upload documents of type (pdf,txt,doc,docx,xls,xlsx) and images of type (jpeg,jpg,png,gif,svg)"));
    }
  };

// const fileFilter = function (req,file, cb) {
//     // Allowed file extensions for images
//     const imageFileTypes = /jpeg|jpg|png|gif|svg/;
  
//     // Allowed file extensions for documents
//     const documentFileTypes = /pdf|txt|doc|docx|xls|xlsx/;
  
//     // Check extension names
//     const extName = file.originalname && file.originalname.match(/\.(jpg|jpeg|png|gif|svg|pdf|txt|doc|docx|xls|xlsx)$/i);
  
//     // Check mime type
//     const mimeType = file.mimetype && file.mimetype.match(/^image\/(jpeg|jpg|png|gif|svg|pdf|plain|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-excel|xlsx)$/);
  
//     if (mimeType && extName) {
//       return cb(null, true);
//     } else {
//       cb( new Error("Error: You can only upload documents of type (pdf,txt,doc,docx,xls,xlsx) and images of type! (jpeg,jpg,png,gif,svg)"));
//     }
//   };
  







const storage=multer.diskStorage({ 
    destination:function(req,file,cb){
        console.log(__dirname);
        cb(null,uploadDirectory)
    },
    filename:function(req,file,cb){   //we can even use this , Date.now() + '-' + Math.round(Math.random() * 1E9)
        const timestamp = new Date().toISOString().replace(/:/g, '-'); 
        const userImageFilename = `${timestamp}-${sanitizeFilename(file.originalname)}`;
        cb(null, userImageFilename);
    }
})
const upload= multer({ storage: storage,
                       limits:{fileSize:1000000*5},                 //file size maximum limit is 5MB
                       fileFilter:fileFilter}).single('userImage_or_anyFile');



  // Use upload.single('userImage') middleware to handle file upload
    // upload.single('userImage')(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //         // A Multer error occurred when uploading.
    //         console.error('Multer Error:', err);
    //         return res.status(500).json({ error: 'Multer Error' });
    //     } else if (err) {
    //         // An unknown error occurred.
    //         console.error('Unknown Error:', err);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }

    //     // Now, continue processing the request with the uploaded file information



module.exports=upload;

