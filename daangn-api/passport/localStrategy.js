const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

// 로그인 시 사용자 정보를 DB에서 조회하고, 사용자 존재 여부와 비밀번호 비교(인증과정)
module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            // input 태그에서 name으로 사용하는 이름을 지정
            usernameField: 'email',
            passwordField: 'password',
         },
         // 실제 로그인 인증 로직
         async (email, password, done) => {
            try {
               // 1. 이메일로 사용자 조회
               const exUser = await User.findOne({ where: { email } })

               // 2. 이메일 해당하는 사용자가 있으면 비밀번호가 맞는지 확인
               if (exUser) {
                  const result = await bcrypt.compare(password, exUser.password)

                  if (result) {
                     done(null, exUser)
                  } else {
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                  }
               } else {
                  // 3. 이메일에 해당하는 사용자가 없는 경우 message를 passport에 반환
                  done(null, false, { message: '가입되지 않은 회원입니다.' })
               }
            } catch (error) {
               console.error(error)
               done(error)
            }
         }
      )
   )
}
