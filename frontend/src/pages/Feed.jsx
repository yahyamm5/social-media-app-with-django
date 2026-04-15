import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { userApiStore } from '../api/apiStore';
import Post from '../components/Post'; 

const Feed = () => {
  const { posts, fetchFeed, loading, error } = userApiStore();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Your Feed
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && posts.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No posts yet. Start following people or create a post!
        </Typography>
      )}

      <Box>
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </Box>
    </Container>
  );
};

export default Feed;