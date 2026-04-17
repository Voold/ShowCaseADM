import {useEffect, useRef, useState} from "react";
import styles from './UsersList.module.css'
import {UserSlot} from "@/entities/user";
import {Pagination, SearchInput} from "@/shared/ui";

const mockUsers = Array.from({ length: 24 }, (_, i) => ({
  id: i.toString(),
  fullName: `Ярон ${i + 1}. Н.`,
  email: `user${i + 1}@example.com`,
  userRole: {
    title: i % 3 === 0 ? 'Админ' : 'Главный пидорас',
    isActive: i % 2 === 0,
  },
}));

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const listContainerRef = useRef<HTMLDivElement>(null)
  const userSlotRef = useRef<HTMLDivElement>(null)
  const cachedItemHeight = useRef<number>(0)

  useEffect(() => {


    const calculateCapacity = () => {
      if (!listContainerRef.current) return
      if (userSlotRef.current) {
        cachedItemHeight.current = userSlotRef.current.clientHeight
      }

      const containerHeight = listContainerRef.current.clientHeight
      const itemHeight = cachedItemHeight.current || 66
      // const itemHeight = 66

      const gap = 8
      const totalItemHeight = itemHeight + gap

      const count = Math.floor(containerHeight / totalItemHeight)

      setItemsPerPage(count > 0 ? count : 1)
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateCapacity()
    })

    if (listContainerRef.current) {
      resizeObserver.observe(listContainerRef.current)
    }

    return () => resizeObserver.disconnect();
  }, [searchQuery])

  const filteredUsers = mockUsers.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedUsers = filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  )

  return (
      <div className={styles.container}>
        <SearchInput
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
            }}
        />
        <div className={styles.userList} ref={listContainerRef}>
          {paginatedUsers.map(user => (
              <UserSlot
                  className={styles.userSlot}
                  key={user.id}
                  ref={userSlotRef}
                  id={user.id}
                  fullName={user.fullName}
                  email={user.email}
                  userRole={user.userRole}
              />
          ))}
        </div>
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
            onPageSelect={setCurrentPage}
        />
      </div>
  )
}

export default UsersList