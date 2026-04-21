import { Box, Button, TextField } from "@mui/material"
import { userApiStore } from "../api/apiStore" 
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const  { accessToken, createpost } = userApiStore();
    const [PostContent,setPostContent] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const handlecreatepost = async (e) => {
        e.preventDefault();
        try {
            if (accessToken) {
                await createpost(PostContent);
                navigate('/')
            } else {
                setErrorMessage("must login to create a post")
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ position: "fixed", top: "850px", left: "1350px"}}>
            <form onSubmit={handlecreatepost}>
                <TextField placeholder="create a post" value={PostContent} onChange={(e) => setPostContent(e.target.value)}/>
                <Button type="submit" sx={{bgcolor: "#1976d2", color:"white", height: "55px",  borderRadius: "5px"}} >Post</Button>
            </form>
            {errorMessage && (<Box sx={{color: "red"}} >{errorMessage}</Box>)}
        </Box>
    )
}

export default CreatePost
