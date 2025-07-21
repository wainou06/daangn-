const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt') // 암호화
const User = require('../models/user')
const router = express.Router()

const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, addr, nick, password } = req.body

      // 기존 사용자 검색
      const exUser = await User.findOne({
         where: { email },
      })

      if (exUser) {
         const error = new Error('이미 존재하는 이메일입니다.')
         error.status = 409
         return next(error)
      }

      // 닉네임 중복 처리
      const exNick = await User.findOne({
         where: { nick },
      })

      if (exNick) {
         const nickerror = new Error('이미 존재하는 닉네임입니다.')
         nickerror.status = 409
         return next(nickerror)
      }

      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12)

      // 사용자 생성
      const newUser = await User.create({
         email,
         name,
         nick,
         addr,
         password: hash,
      })

      res.status(201).json({
         message: '회원가입 완료!',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

// 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         authError.status = 500
         authError.message = '인증 중 오류 발생'
         return next(authError)
      }

      if (!user) {
         const err = new Error(info.message || '로그인 실패')
         err.status = 401
         return next(err)
      }

      req.login(user, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }

         res.status(200).json({
            message: '로그인 성공',
            user: {
               id: user.id,
               name: user.name,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         logoutError.status = 500
         logoutError.message = '로그아웃 중 오류 발생'
         return next(logoutError)
      }

      res.status(200).json({
         message: '로그아웃 성공',
      })
   })
})

// 로그인 상태 확인
router.get('/status', async (req, res, next) => {
   try {
      if (req.isAuthenticated()) {
         res.status(200).json({
            isAuthenticated: true,
            user: {
               id: req.user.id,
               nick: req.user.nick,
            },
         })
      } else {
         res.status(200).json({
            isAuthenticated: false,
         })
      }
   } catch (error) {
      error.status = 500
      error.message = '로그인 상태확인 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
