import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';

const Post = ({ postData }) => {
  if (!postData) return null;

  return (
    <Card sx={{ mb: 4, border: '1px solid #ddd' }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {postData.author_username?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={postData.author_username}
        subheader={new Date(postData.created_at).toLocaleDateString()}
      />
      
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1">
          {postData.content}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {postData.likes_count} Likes • {postData.comments?.length || 0} Comments
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;