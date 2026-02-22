const multer = require('multer')
const path = require('path')

// ตั้งค่าที่เก็บไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) { //cb คือ callback 
    cb(null, './public/uploads') // path ปลายทาง
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ใหม่: timestamp + นามสกุลไฟล์เดิม
    // ตัวอย่าง: 1678901234.jpg
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// กรองประเภทไฟล์ (รับเฉพาะรูปภาพ)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'))
  }
}

// export middleware
// limits: จำกัดขนาดไฟล์ไม่เกิน 2MB
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: fileFilter 
}).single('image') // รับ key ชื่อ 'image'

module.exports = upload