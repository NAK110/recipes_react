import { userApi } from "@/api/services/userApi";
import { type User } from "@/api/types/user";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Edit handler
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEdit(true);
  };

  const handleUserUpdated = () => {
    fetchUsers();
  };

  //Delete handler
  const [deleteUser, setDeleteUser] = useState(false);
  const [selectDeleteUser, setSelectDeleteUser] = useState<User | null>(null);

  const handleDelete = (user: User) => {
    setSelectDeleteUser(user);
    setDeleteUser(true);
  };

  const handleUserDeleted = () => {
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await userApi.getAllUser();
      setUsers(users);
    } catch (error) {
      setError("Error fetching users");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="p-4 w-full overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">User</h1>
          <Table className="w-full">
            <TableCaption>Here's all the users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead className="w-[200px]">Username</TableHead>
                <TableHead className="w-[300px]">Email</TableHead>
                <TableHead className="w-[200px]">Role</TableHead>
                <TableHead className="w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-semibold">
                      {user.username}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {user.email}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="default"
                        className="text-accent"
                        onClick={() => handleEdit(user)}
                      >
                        <SquarePen className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="ml-2"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No user found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <EditUser
        open={edit}
        onOpenChange={setEdit}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />

      <DeleteUser
        open={deleteUser}
        onOpenChange={setDeleteUser}
        user={selectDeleteUser}
        onUserDeleted={handleUserDeleted}
      />
    </>
  );
}

export default UserTable;
