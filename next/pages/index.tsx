import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import MintingModal from '../components/MintingModal';
import { useCaver } from '../hooks';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Button colorScheme="purple" onClick={onOpen}>
          민팅하기
        </Button>
      </Flex>
      <MintingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
