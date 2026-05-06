import {useState} from "react";
import styles from './UsersList.module.css'
import {UserSlot} from "@/entities/user";
import {DynamicList} from "@/shared";

const mockUsers = Array.from({length: 24}, (_, i) => ({
  id: i.toString(),
  fullName: `Ярон ${i + 1}. Н.`,
  email: `user${i + 1}@example.com`,
  userRole: {
    title: i % 3 === 0 ? 'Админ' : 'Пользователь',
    isActive: i % 2 === 0,
  },
}));

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredUsers = mockUsers.filter((user) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
        user.fullName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
  });

  const paginatedUsers = filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  return (
      <DynamicList
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={"Найти пользователя..."}
      >
        {
          paginatedUsers.map(user => (
              <UserSlot
                  className={styles.userSlot}
                  key={user.id}
                  id={user.id}
                  fullName={user.fullName}
                  email={user.email}
                  userRole={user.userRole}
              />
          ))
        }
      </DynamicList>
  );
}

export default UsersList;