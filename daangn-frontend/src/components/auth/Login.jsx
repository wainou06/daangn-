import { Button, CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUserThunk, clearAuthError } from '../../features/authSlice'

function Login() {
   const [id, setId] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   const handleLogin = (e) => {
      e.preventDefault()
      if (!id.trim()) {
         alert('아이디를 입력해주세요.')
      } else if (!password.trim()) {
         alert('비밀번호를 입력해주세요.')
         return
      }

      dispatch(loginUserThunk({ email: id, password }))
         .unwrap()
         .then(() => navigate('/'))
         .catch((error) => console.error('로그인 실패: ', error))
   }

   return (
      <form className="login-form" onSubmit={handleLogin}>
         {error && <p style={{ fontSize: '14px', color: 'red' }}>로그인 실패</p>}
         <span className="input-span">
            <label htmlFor="id" className="label">
               아이디
            </label>
            <input type="text" name="email" id="id" onChange={(e) => setId(e.target.value)} />
         </span>
         <span className="input-span">
            <label htmlFor="password" className="label">
               비밀번호
            </label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
         </span>

         <Button variant="contained" color="warning" type="submit" fullWidth disabled={loading} sx={{ position: 'relative', marginTop: '20px' }}>
            {loading ? (
               <CircularProgress
                  size={24}
                  sx={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                  }}
               />
            ) : (
               '로그인'
            )}
         </Button>
         <span className="span">
            아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
         </span>
      </form>
   )
}

export default Login
