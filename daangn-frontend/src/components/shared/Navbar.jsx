import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CreateIcon from '@mui/icons-material/Create'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'

function Navbar({ isAuthenticated, user }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => alert('로그아웃 실패:', error))
   }

   return (
      <Box style={{ marginBottom: '50px' }}>
         <AppBar position="static" style={{ backgroundColor: '#ff8800' }}>
            <Toolbar>
               <Link to="/posts/create">
                  <IconButton className="mobile-menu" size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                     <MenuIcon />
                  </IconButton>
               </Link>
               <img src="/images/nav-logo.png" alt="로고" className="logo" />
               <Typography className="company" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/">
                     <p style={{ color: '#fff' }}>당근</p>
                  </Link>
               </Typography>
               {isAuthenticated ? (
                  <>
                     <div className="write">
                        <Link to="/posts/create">
                           <IconButton aria-label="글쓰기">
                              <CreateIcon />
                           </IconButton>
                        </Link>
                        <Link to="/my" style={{ textDecoration: 'none' }}>
                           <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                              {user?.nick}님
                           </Typography>
                        </Link>
                     </div>
                     <Button onClick={handleLogout} variant="outlined" color="white">
                        로그아웃
                     </Button>
                  </>
               ) : (
                  <Link to="/login">
                     <Button variant="contained" style={{ backgroundColor: '#eb6200' }}>
                        로그인
                     </Button>
                  </Link>
               )}
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default Navbar
