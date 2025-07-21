import { Button, Container, Typography, CircularProgress } from '@mui/material'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUserThunk, clearAuthError } from '../../features/authSlice'

function Signup() {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [checkpassword, setCheckPassword] = useState('')
   const [nick, setNick] = useState('')
   const [addr, setAddr] = useState('')
   const [isSignup, setIsSignup] = useState(false)

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error, nickerror } = useSelector((state) => state.auth)

   useEffect(() => {
      // 경로 이동할때 error state를 null로 초기화
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleSignup = () => {
      if (password !== checkpassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }

      dispatch(registerUserThunk({ email, name, password, nick, addr }))
         .unwrap()
         .then(() => {
            setIsSignup(true)
         })
         .catch((error) => {
            console.error('회원가입 에러: ', error)
         })
   }

   // 모든 필드 입력
   const isFormValid = email.trim() && name.trim() && password.trim() && checkpassword.trim() && nick.trim() && addr.trim()

   // 회원가입이 완료되었을때 보일 컴포넌트
   if (isSignup) {
      return (
         <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center">
               회원가입이
               <br />
               완료되었습니다!
            </Typography>
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
               로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.
            </Typography>
            <Button variant="contained" color="warning" fullWidth style={{ marginTop: '20px' }} onClick={() => navigate('/login')}>
               로그인 하러 가기
            </Button>
         </Container>
      )
   }

   return (
      <form className="signup-form">
         <span className="input-span">
            <label htmlFor="email" className="label">
               이메일
               {error && <p style={{ fontSize: '14px', color: 'red' }}>{error}</p>}
            </label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="name" className="label">
               이름
            </label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="password" className="label">
               비밀번호
            </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="checkpassword" className="label">
               비밀번호 확인
            </label>
            <input type="password" name="checkpassword" id="checkpassword" value={checkpassword} onChange={(e) => setCheckPassword(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="nick" className="label">
               닉네임{nickerror && <p style={{ fontSize: '14px', color: 'red' }}>{nickerror}</p>}
            </label>
            <input type="text" name="nick" id="nick" value={nick} onChange={(e) => setNick(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="addr" className="label">
               주소
            </label>
            <input type="text" name="addr" id="addr" value={addr} onChange={(e) => setAddr(e.target.value)} />
         </span>

         {/* 로딩 중이면 회원가입 버튼 비활성화 */}
         <Button variant="contained" color="warning" onClick={handleSignup} fullWidth disabled={!isFormValid || loading} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '회원가입'}
         </Button>
      </form>
   )
}

export default Signup
