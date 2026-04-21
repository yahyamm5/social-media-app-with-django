import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"
import MainFeed from "../components/MainFeed"

const HomePage = () => {

  return (
    <Box>
        <Box sx={{marginBottom: 20}} >
            <Navbar/>
        </Box>
        <Box>
          <MainFeed/>
        </Box>
        <Box  >
            <CreatePost/>
        </Box>
    </Box>
  )
}

export default HomePage
