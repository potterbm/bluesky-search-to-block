import { User } from '@/components/UserList/types';
import UserList from '@/components/UserList/UserList';
import { Heading, Input, VStack } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';

const users: User[] = [
  {
    did: 'abc:def:hij1',
    pfp: 'http://placecats.com/48/48',
    displayName: 'Kitten',
    handle: 'kitten.bsky.social',
  },
  {
    did: 'abc:def:hij2',
    pfp: 'http://placecats.com/50/50',
    displayName: 'cat',
    handle: 'cat.bsky.social',
  },
  {
    did: 'abc:def:hij3',
    pfp: 'http://placecats.com/55/55',
    displayName: 'Cats (The Musical)',
    handle: 'catsthemusical.com',
  },
  {
    did: 'abc:def:hij4',
    pfp: 'http://placecats.com/60/60',
    displayName: 'Lynx',
    handle: 'a.lynx.baby',
  },
  {
    did: 'abc:def:hij5',
    pfp: 'http://placecats.com/65/65',
    displayName: 'Furry Critter',
    handle: 'fur.baby',
  },
];

export default function Search() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearch(event.currentTarget.value),
    []
  );

  // TODO: typeahead search

  return (
    <VStack width="100%">
      <VStack>
        <Heading>Search</Heading>
        <Input value={search} onChange={handleSearchChange} />
      </VStack>

      <UserList users={users} selected={selected} onChange={setSelected} />
    </VStack>
  );
}
