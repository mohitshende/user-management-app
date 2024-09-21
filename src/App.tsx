import React, { useState, useEffect } from "react";
import UsersTable from "./components/UsersTable";
import AddUserForm from "./components/AddUserForm";
import ToastNotification from "./components/ToastNotification";
import usersData from "../users.json";
import { User } from "./types";
import { Box, Typography } from "@mui/material";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const addUser = (user: User) => {
    setUsers([...users, user]);
    setToastMessage("User added successfully!");
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        aria-label="No users found"
        sx={{ marginBottom: 4 }}
      >
        User Management
      </Typography>
      <AddUserForm addUser={addUser} />
      <UsersTable users={users} />
      <ToastNotification
        message={toastMessage}
        open={toastOpen}
        onClose={handleCloseToast}
      />
    </Box>
  );
};

export default App;
