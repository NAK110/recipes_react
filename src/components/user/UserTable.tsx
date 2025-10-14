import { userApi } from "@/api/services/userApi";
import { type User } from "@/api/types/user";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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

export interface userTableRef {
  fetchUsers: () => Promise<void>;
}

const UserTable = forwardRef<userTableRef>((_props, ref) => {
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

  useImperativeHandle(ref, () => ({
    fetchUsers,
  }));

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 text-center">{error}</div>;
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={user.id}
                className="border rounded-lg p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">
                      {user.username}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      ID: {index + 1}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shrink-0">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </p>
                  <p className="text-sm break-words">{user.email}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 touch-manipulation"
                    onClick={() => handleEdit(user)}
                  >
                    <SquarePen className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 touch-manipulation"
                    onClick={() => handleDelete(user)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="p-4 w-full overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
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
                  users.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
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
});

export default UserTable;