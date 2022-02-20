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

const RoundOne = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const { theme } = useTheme()

  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <NftIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <WaitIcon color="failure" width="36px" />,
  }

  useEffect(() => {
    const root: any = document.documentElement
    const marqueeElementsDisplayed: any = getComputedStyle(root).getPropertyValue('--marquee-elements-displayed')
    const marqueeContent: any = document.querySelector('ul.marquee-content')
    root.style.setProperty('--marquee-elements', marqueeContent.children.length)

    for (let i = 0; i < marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
    }
  }, [])

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" mt="50px">
      {/* <GradientLogo height="48px" width="48px" mb="24px" /> */}
      <Heading textAlign="center" color="#E93E7D" scale="xl">
        {t('ROUND 1 - Dalgona')}
      </Heading>
      {/* <Heading textAlign="center" scale="xl" mb="32px">
        {t('Trusted with billions.')}
      </Heading> */}
      <Text textAlign="center" color="textSubtle" mb="20px">
        {t('Mint at least one NFT to accept your inviation to the game.')}
      </Text>
      {/* <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {entrusting}
          <>{data ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text>
      </Flex> */}

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join?')}
      </Text>

      <div className="marquee">
        <ul className="marquee-content">
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 1.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 5.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 3.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 4.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 6.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 7.png" alt="Dalgona samples" />
          </li>
          <li>
            <DalgonaImgRow src="/images/pixel/carousel/Artboard 2.png" alt="Dalgona samples" />
          </li>
        </ul>
      </div>

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('4,560 unique NFTs', { users })}
            bodyText={t('to trade and collect')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('0.8 SOL per mint', { trades })}
            bodyText={t('no mint limit to accounts')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('Release date Nov-26-2021', { tvl: tvlString })}
            bodyText={t('at 1:00pm UTC')}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default RoundOne
