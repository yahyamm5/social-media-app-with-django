import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Post from "../components/Post"

const HomePage = () => {

  return (
    <Box>
        <Box sx={{marginBottom: 20}} >
            <Navbar/>
        </Box>
        <Box>
            <Post/>
        </Box>
    </Box>
  )
}

export default HomePage
