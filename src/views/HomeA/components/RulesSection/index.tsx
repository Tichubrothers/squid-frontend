import React, { useEffect } from 'react'
import {
  Heading,
  Flex,
  Text,
  Skeleton,
  ChartIcon,
  CommunityIcon,
  NftIcon,
  SwapIcon,
  InfoIcon,
  WaitIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import useTheme from 'hooks/useTheme'
import styled, { keyframes } from 'styled-components'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
// import GradientLogo from '../GradientLogoSvg'
import './rowstyles.css'

// Values fetched from bitQuery effective 6/9/21
const txCount = 30841921
const addressCount = 2751624

const DalgonaImgRow = styled.img``

const Rules = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const { theme } = useTheme()

  const TradesCardData: IconCardData = {
    icon: <InfoIcon color="primary" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" mt="50px">
      <Heading textAlign="center" color="#E93E7D" scale="xl" mb="32px">
        {t('RULES')}
      </Heading>

      {/* <Text textAlign="center" color="textSubtle" mb="20px">
        {t('Mint at least one NFT to accept your inviation to the game.')}
      </Text> */}

      {/* <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join?')}
      </Text> */}

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          {/* <StatCardContent
            headingText={t('0.8 SOL per mint')}
            bodyText={t('no mint limit to accounts')}
            highlightColor={theme.colors.primary}
          /> */}
          <Flex
            minHeight={[null, null, null, '0px']}
            minWidth="250px"
            width="fit-content"
            flexDirection="column"
            justifyContent="flex-end"
            mt={['64px', null, null, '64px']}
          >
            <Text mb="10px">{t('⭐ To participate, players must hold at least one Squid NFT Game NFT.')}</Text>
            <Text mb="10px">{t('⭐ To win, players must meet the following conditions,')}</Text>
            <Text mb="10px" ml="70px">
              {t('⭕ Hold a Round 1 - Dalgona NFT in wallet.')}
            </Text>
            <Text mb="10px" ml="70px">
              {t('⭕ Hold a Round 2 - Red Light, Green Light NFT in wallet.')}
            </Text>
            <Text mb="10px" ml="70px">
              {t('⭕ Survive elimination rounds 3, 4, 5 and 6.')}
            </Text>
            {/* <Text mb="10px">
              {t('⭐ During the elimination rounds, surviving players may vote to end the game and split the prize.')}
            </Text> */}
            <Text mb="10px">{t('⭐ The last player standing wins and takes home the ultimate prize.')}</Text>
            <Text color="textSubtle" mt="20px" textAlign="center">
              {t('Throughout the rounds there will be various royalty distribution and airdrop events.')}
            </Text>
            <Text color="textSubtle" textAlign="center">
              {t('Be sure to check out our Roadmap and follow our Twitter and Discord channels for updates.')}
            </Text>
          </Flex>
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Rules
