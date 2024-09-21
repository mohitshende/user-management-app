import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { User } from "../types";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table aria-label="Users table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="h6" aria-label="No users found">
                  No users found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.email}>
                <TableCell aria-label={`Username: ${user.username}`}>
                  {user.username}
                </TableCell>
                <TableCell aria-label={`First Name: ${user.firstName}`}>
                  {user.firstName}
                </TableCell>
                <TableCell aria-label={`Last Name: ${user.lastName}`}>
                  {user.lastName}
                </TableCell>
                <TableCell aria-label={`Email: ${user.email}`}>
                  {user.email}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
