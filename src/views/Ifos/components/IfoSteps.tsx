import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import {
  Flex,
  Stepper,
  Step,
  StepStatus,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Link,
  OpenNewIcon,
} from '@pancakeswap/uikit'
import { Link as RouterLink } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { Ifo } from 'config/constants/types'
import { WalletIfoData } from 'views/Ifos/types'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import Container from 'components/Layout/Container'
import { useProfile } from 'state/profile/hooks'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import ConnectWalletButton from 'components/ConnectWalletButton'

interface Props {
  ifo: Ifo
  walletIfoData: WalletIfoData
}

const Wrapper = styled(Container)`
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};
  backgroun: 'linear-gradient(180deg, #201335 22%, #09070C 100%)'
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const IfoSteps: React.FC<Props> = ({ ifo, walletIfoData }) => {
  const { poolBasic, poolUnlimited } = walletIfoData
  const { hasProfile } = useProfile()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { balance } = useTokenBalance(ifo.currency.address)
  // MAKE TRUE AFTER PROGRESSING EACH ROUND
  const roundOne: any = false
  const roundTwo: any = false
  const roundThree: any = false
  const roundFour: any = false
  const roundFive: any = false
  const roundSix: any = false
  const stepsValidationStatus = [
    // hasProfile,
    // balance.isGreaterThan(0),
    // poolBasic.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0),
    // poolBasic.hasClaimed || poolUnlimited.hasClaimed,
    roundOne,
    roundTwo,
    roundThree,
    roundFour,
    roundFive,
    roundSix,
  ]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    const isStepValid = stepsValidationStatus[step]

    const renderAccountStatus = () => {
      if (!account) {
        return <ConnectWalletButton />
      }

      if (isStepValid) {
        return (
          <Text color="success" bold>
            {t('Profile Active!')}
          </Text>
        )
      }

      return (
        <Button as={RouterLink} to={`${nftsBaseUrl}/profile/${account.toLowerCase()}`}>
          {t('Activate your Profile')}
        </Button>
      )
    }

    switch (step) {
      case 0:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 1 - Dalgona')}
              </Heading>
              <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text>
            </Flex>
            <Flex>
              <Text color="textSubtle" small mb="20px">
                {t('🍦🍧🍨🍩🍪🎂🍰🧁🍫🍬🍭🍡🍮')}
              </Text>
              {/* <i>
                <Text color="textSubtle" small ml="3px">
                  {t('I’m good at everything, except the things I can’t do.')}
                </Text>
              </i> */}
            </Flex>
            <Text color="textSubtle" small mb="50px">
              {t('Minting of 4,560 unique Dalgona NFTs will be available on Nov-26-2021 at 1:00pm UTC.')}
            </Text>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Major Airdrop Event')}
              </Heading>
              <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text>
            </Flex>
            <Text color="textSubtle" small mb="50px">
              {t('Follow us on Twitter and Discord for more details. Equal opportunity is important to us!')}
            </Text>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Marketplace Integration')}
              </Heading>
              <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text>
            </Flex>
            <Text color="textSubtle" small mb="0px">
              {t('NFTs will be made available on major secondary exchanges after launch.')}
            </Text>
            <Text color="textSubtle" small mb="50px">
              {t(
                'To name a few we will aim integrate market listings with Alpha Art Market, Digitaleyes, Solsea and more. ',
              )}
            </Text>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Rarity Rankings')}
              </Heading>
              <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text>
            </Flex>
            <Text color="textSubtle" small mb="0px">
              {t('Rarity rankings for NFT attributes will be avaliable closer to release date.')}
            </Text>
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 2 - Red Light, Green Light')}
              </Heading>
              {/* <Text marginLeft="5px" color="success">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Flex>
              <Text color="textSubtle" small>
                {t('🎶')}
              </Text>
              <i>
                <Text color="textSubtle" small ml="3px">
                  {t('Mugunghwa kkoci pieot seumnida.')} <br />
                </Text>
              </i>
              <Text color="textSubtle" small ml="3px" mb="50px">
                {t('🎶')}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Mini Airdrop Event')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Text color="textSubtle" small mb="50px">
              {t(
                'Holders of Round 1 NFT will have a chance to earn a Round 2 NFT. Follow our Twitter and Discord channels to find out how.',
              )}
            </Text>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Ultimate Prize Announcement')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Text color="textSubtle" small mb="0px">
              {t(
                'The ultimate prize will be announced after Round 2 is complete and is based on the percentage of mints sold.',
              )}
            </Text>

            {/* <Button
              as={Link}
              external
              href={`${BASE_ADD_LIQUIDITY_URL}/BNB/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t('Get LP tokens')}
            </Button> */}
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 3 - Tug of War')}
              </Heading>

              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Flex>
              <Text color="textSubtle" small mb="50px">
                {t('😤💢💪🥵')}
              </Text>
              {/* <i>
                <Text color="textSubtle" small ml="3px" mb="50px">
                  {t('Brute strength alone may not be enough.')}
                </Text>
              </i> */}
            </Flex>

            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('Play-to-Earn Event')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Text color="textSubtle" small>
              {t(
                'Winners of this round will recieve a portion of the Royalty Pool split amongst them and proceed to Round 4.',
              )}
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 4 - Marbles')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Flex>
              <Text color="textSubtle" small>
                {t('🤔🤝🔮😭')}
              </Text>
              {/* <i>
                <Text color="textSubtle" small ml="3px" mb="50px">
                  {t('Brute strength alone may not be enough.')}
                </Text>
              </i> */}
            </Flex>
          </CardBody>
        )
      case 4:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 5 - Glass Floor')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Flex>
              <Text color="textSubtle" small>
                {t('🤸‍♂️🤸‍♀️🤸‍♂️🤸‍♀️')}
              </Text>
            </Flex>
          </CardBody>
        )
      case 5:
        return (
          <CardBody>
            <Flex justifyContent="space-between" mb="8px">
              <Heading as="h4" color="secondary">
                {t('ROUND 6 - Squid Game')}
              </Heading>
              {/* <Text marginLeft="5px" color="primary">
                {t('In Progress')}
              </Text> */}
            </Flex>
            <Flex>
              <Text color="textSubtle" small mb="30px">
                {t('💎🙌🤑🔥🎉🎊💰📈🚀💯')}
              </Text>
              {/* <i>
                <Text color="textSubtle" small ml="3px">
                  {t('Good rain knows the best time to fall.')}
                </Text>
              </i> */}
            </Flex>

            <Text color="textSubtle" small bold mb="5px">
              {t('THE FINAL ROUND')}
            </Text>
            <Text color="textSubtle" small mb="0px">
              {t('A winner is to be decided and will take home the ultimate prize!')}
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" scale="xl" color="failure" mb="24px" textAlign="center">
        {t('ROADMAP')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          <Step
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            statusFirstPart={getStatusProp(index)}
            statusSecondPart={getStatusProp(index + 1)}
          >
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
