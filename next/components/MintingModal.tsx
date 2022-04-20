import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MINT_GEM_ADDRESS } from '../caverConfig';
import { useAccount, useCaver } from '../hooks';

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, onClose }) => {
  const { account } = useAccount();
  const { caver, mintGemContract } = useCaver();

  const onClickMint = async () => {
    try {
      if (!account || !caver || !mintGemContract) return;

      const response = await caver.klay.sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: account,
        to: MINT_GEM_ADDRESS,
        value: caver.utils.convertToPeb(1, 'KLAY'),
        gas: '3000000',
        data: mintGemContract.methods.mintGemToken().encodeABI(),
      });
      console.log(response);
    } catch (error) {
      console.dir(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>민팅하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>민팅을 진행하시겠습니까?</Text>
          <Text>(1 Klay가 소모됩니다.)</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            variant="ghost"
            mr={2}
            onClick={onClickMint}
          >
            민팅하기
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintingModal;
