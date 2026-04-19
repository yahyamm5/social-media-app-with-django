import { Box, Button, TextField } from "@mui/material"
import { userApiStore } from "../api/apiStore" 
import { useState } from "react";

const CreatePost = () => {

    const  { accessToken, createpost } = userApiStore();
    const [PostContent,setPostContent] = useState('')

    const handlecreatepost = async (e) => {
        e.preventDefault();
        try {
            if (accessToken) {
                await createpost(PostContent);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ position: "absolute", top: "850px", left: "800px"}}>
            <form onSubmit={handlecreatepost}>
                <TextField placeholder="create a post" value={PostContent} onChange={(e) => setPostContent(e.target.value)}/>
                <Button type="submit" sx={{bgcolor: "#1976d2", color:"white", height: "55px",  borderRadius: "5px"}} >Post</Button>
            </form>
        </Box>
    )
}

export default CreatePost
