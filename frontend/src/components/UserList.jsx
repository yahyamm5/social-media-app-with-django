import React, { useEffect } from 'react';
import { userApiStore } from '../api/apiStore';
import { List, ListItem, ListItemText, Paper, Typography, CircularProgress } from '@mui/material';

const UserList = () => {
    const { users, fetchUsers, loading } = userApiStore();

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6">Registered Users</Typography>
            <List>
                {users.map((user) => (
                    <ListItem key={user.id} divider>
                        <ListItemText 
                            primary={user.username} 
                            secondary={user.email} 
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default UserList;