import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"

const HomePage = () => {

  return (
    <Box>
        <Box sx={{marginBottom: 20}} >
            <Navbar/>
        </Box>
        <Box>
            <Post/>
        </Box>
        <CreatePost/>
    </Box>
  )
}

export default HomePage
