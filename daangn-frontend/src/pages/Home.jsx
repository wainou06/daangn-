import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

import { Link } from 'react-router-dom'

function Home() {
   return (
      <main className="wrap">
         <div></div>
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
