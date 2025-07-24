import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import LocationPinIcon from '@mui/icons-material/LocationPin'

import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Pagination } from 'swiper/modules'

function Home() {
   return (
      <main className="wrap">
         <div>
            <div className="location">
               <LocationPinIcon style={{ fontSize: '35px', color: 'rgb(0, 160, 91)' }} />
               <Swiper
                  direction={'vertical'}
                  pagination={{
                     clickable: true,
                  }}
                  autoplay={{
                     delay: 2500,
                     disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper"
               >
                  <SwiperSlide>구월동</SwiperSlide>
                  <SwiperSlide>논현동</SwiperSlide>
                  <SwiperSlide>송도동</SwiperSlide>
                  <SwiperSlide>동춘동</SwiperSlide>
                  <SwiperSlide>남동구</SwiperSlide>
               </Swiper>
               <div
                  style={{
                     fontSize: '30px',
                  }}
               >
                  에서 당근하실래요?
               </div>
            </div>
            <div className="search">
               <input type="text" placeholder="지역을 입력하세요." />

               <button>🥕</button>
            </div>
         </div>

         <Box
            className="mobile-float"
            sx={{
               position: 'fixed',
               bottom: 16,
               right: 16,
               zIndex: 1300,
               display: 'flex',
               flexDirection: 'column-reverse', // 세로 정렬
               '& > :not(style)': {
                  m: 1,
               },
            }}
         >
            <Fab color="primary" aria-label="add">
               <AddIcon />
            </Fab>
            <Link to="/posts/create">
               <Fab color="secondary" aria-label="edit">
                  <EditIcon />
               </Fab>
            </Link>
         </Box>
      </main>
   )
}

export default Home
