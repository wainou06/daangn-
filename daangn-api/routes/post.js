const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Post, Category, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// uploads 폴더가 없을 경우 폴더 생성
try {
   fs.readdirSync('uploads') // 폴더가 있는지 확인
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads') // 폴더 생성
}

// 이미지 업로드를 위한 multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // 업로드 폴더에 파일 저장
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname) // 파일명 디코딩(한글 파일명 깨짐 방지)
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)

         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

// 게시물 등록
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      if (!req.file) {
         const error = new Error('파일 업로드에 실패했습니다.')
         error.status = 400
         return next(error)
      }

      // 게시물 등록
      const post = await Post.create({
         title: req.body.title,
         content: req.body.content,
         img: `/${req.file.filename}`,
         user_id: req.user.id,
      })

      // 카테고리 등록
      const categorys = req.body.categorys.match(/#[^\s#]*/g)

      if (categorys) {
         const result = await Promise.all(
            categorys.map((cate) =>
               Category.findOrCreate({
                  where: { name: cate.slice(1) },
               })
            )
         )

         await post.addCategorys(result.map((r) => r[0]))
      }

      res.json({
         success: true,
         post: {
            id: post.id,
            title: post.title,
            content: post.content,
            img: post.img,
            userID: post.user_id,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 등록 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 수정

// 게시물 삭제

// 특정 게시물 불러오기

// 전체 게시물 불러오기 (페이징 기능)

module.exports = router
