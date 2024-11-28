import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import type { User } from './types';
import { useCallback } from 'react';

interface UserListItemProps {
  user: User;
  selected: boolean;
  toggle: (did: string) => void;
}

export default function UserListItem({
  user,
  selected,
  toggle,
}: UserListItemProps) {
  const handleChange = useCallback(() => toggle(user.did), [toggle, user.did]);

  return (
    <HStack
      width="100%"
      justifyContent="flex-start"
      padding={2}
      paddingStart={4}
      paddingEnd={4}
      borderWidth={1}
      borderColor="border.muted"
      borderRadius="0.5em"
      background="InfoBackground"
    >
      <Avatar src={user.pfp} />

      <VStack alignItems="flex-start" paddingStart={2} gap={0}>
        <Heading>{user.displayName}</Heading>
        <Text>{user.handle}</Text>
      </VStack>

      <Box flexGrow={1} flexBasis="auto" />

      <Box>
        <Checkbox checked={selected} onCheckedChange={handleChange} />
      </Box>
    </HStack>
  );
}
