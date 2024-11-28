import { VStack } from '@chakra-ui/react';
import type { User } from './types';
import { useCallback } from 'react';
import UserListItem from './UserListItem';

interface UserListProps {
  selected: Record<string, boolean>;
  users: User[];
  onChange: (selected: Record<string, boolean>) => void;
}

export default function UserList({ users, selected, onChange }: UserListProps) {
  const toggleSelected = useCallback(
    (did: string) => {
      if (selected[did]) {
        // Remove from map
        const newSelected = { ...selected };
        delete newSelected[did];
        onChange(newSelected);
      } else {
        onChange({ [did]: true, ...selected });
      }
    },
    [onChange, selected]
  );

  return (
    <VStack width="60%" gap={6}>
      {users.map((user) => (
        <UserListItem
          key={user.did}
          user={user}
          toggle={toggleSelected}
          selected={!!selected[user.did]}
        />
      ))}
    </VStack>
  );
}
