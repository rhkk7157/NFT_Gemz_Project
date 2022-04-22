import { Box, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { IGem } from '../interfaces';

interface GemCardProps {
  gemRank: string;
  gemType: string;
}

const GemCard: FC<GemCardProps> = ({ gemRank, gemType }) => {
  const [metaDataURI, setMetaDataURI] = useState<IGem | undefined>(undefined);

  const getMetaData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_METADATA_URI}/${gemRank}/${gemType}.json`
      );

      setMetaDataURI(response.data);
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    getMetaData();
  }, []);
  return (
    <Box w={200}>
      <Image src={metaDataURI?.image} fallbackSrc="loading.png" alt="JoyGemz" />
      <Text>{metaDataURI?.name}</Text>
      <Text>{metaDataURI?.description}</Text>
    </Box>
  );
};

export default GemCard;
