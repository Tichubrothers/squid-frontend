/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon, Button } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import Countdown from 'react-countdown'
import { CircularProgress, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import * as anchor from '@project-serum/anchor'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'

import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import PancakeSquadBanner from './components/Banners/PancakeSquadBanner'

import { SlideSvgDark, SlideSvgLight } from './components/SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './components/CompositeImage'

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from './candy-machine'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-0px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 80%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const imagePath = '/images/home/pixel/'
const imageSrc = 'squidpig'

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const ConnectButton = styled(WalletDialogButton)``

const CounterText = styled.span`` // add your styles here

const MintContainer = styled.div`` // add your styles here

const MintButton = styled(Button)`
  background-color: #e93e7d;
  margin-top: 16px;
` // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey
  config: anchor.web3.PublicKey
  connection: anchor.web3.Connection
  startDate: number
  treasury: anchor.web3.PublicKey
  txTimeout: number
}

const Home = (props: HomeProps) => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const [balance, setBalance] = useState<number>()
  const [isActive, setIsActive] = useState(false) // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false) // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false) // true when user got to press MINT

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: '',
    severity: undefined,
  })

  // eslint-disable-next-line react/destructuring-assignment
  const [startDate, setStartDate] = useState(new Date(props.startDate))

  const wallet = useAnchorWallet()
  const [candyMachine, setCandyMachine] = useState<CandyMachine>()
  const [itemsRemaining, setItemsRemaining] = useState(0)
  const [itemsAvailable, setItemsAvailable] = useState(0)

  const onMint = async () => {
    try {
      setIsMinting(true)
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(candyMachine, props.config, wallet.publicKey, props.treasury)

        const status: any = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          'singleGossip',
          false,
        )

        if (!status?.err) {
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
          })
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          })
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || 'Minting failed! Please try again!'
      if (!error.msg) {
        // eslint-disable-next-line no-empty
        if (error.message.indexOf('0x138')) {
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (error.code === 311) {
          message = `SOLD OUT!`
          setIsSoldOut(true)
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`
        }
      }

      setAlertState({
        open: true,
        message,
        severity: 'error',
      })
    } finally {
      if (wallet) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const balance = await props.connection.getBalance(wallet.publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      }
      setIsMinting(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      }
    })()
  }, [wallet, props.connection])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (!wallet) return

      const { candyMachine, goLiveDate, itemsRemaining, itemsAvailable } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection,
      )

      setIsSoldOut(itemsRemaining === 0)
      setStartDate(goLiveDate)
      setCandyMachine(candyMachine)
      setItemsRemaining(itemsRemaining)
      setItemsAvailable(itemsAvailable)
    })()
  }, [wallet, props.candyMachineId, props.connection])

  return (
    <>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'radial-gradient(103.12% 50% at 50% 50%, #3a1935 0%, #261323 100%)'
            : 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)'
        }
        // height="800px"
        index={2}
        hasCurvedDivider={false}
      >
        <BgWrapper>
          <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
        </BgWrapper>
        <Flex
          position="relative"
          flexDirection={['column-reverse', null, null, 'row']}
          alignItems={['flex-end', null, null, 'center']}
          justifyContent="center"
          mt={[account ? '280px' : '50px', null, 0]}
          id="homepage-hero"
        >
          <Flex flex="1" flexDirection="column">
            <Heading scale="xxl" color="#E93E7D" mb="24px">
              {t('AN INVITATION TO PLAY.')}
            </Heading>
            <Heading scale="md" mb="24px">
              {t(
                '10,000 uniquely generated, cute and collectible pixel art souls with proof of ownership stored on the Solana blockchain.',
              )}
            </Heading>
            {/* {wallet && <Text color="textSubtle">Balance: {(balance || 0).toLocaleString()} SOL</Text>} */}
            <Text color="textSubtle">
              Items available: {itemsRemaining} / {itemsAvailable}
            </Text>
            <MintContainer>
              {!wallet ? (
                <ConnectButton>Connect Wallet</ConnectButton>
              ) : (
                <MintButton disabled={isSoldOut || isMinting || !isActive} onClick={onMint} variant="contained">
                  {isSoldOut ? (
                    <Text textAlign="center" color="textSubtle">
                      SOLD OUT
                    </Text>
                  ) : isActive ? (
                    isMinting ? (
                      <CircularProgress />
                    ) : (
                      <Text textAlign="center">MINT</Text>
                    )
                  ) : (
                    <Countdown
                      date={startDate}
                      onMount={({ completed }) => completed && setIsActive(true)}
                      onComplete={() => setIsActive(true)}
                      renderer={renderCounter}
                    />
                  )}
                </MintButton>
              )}
            </MintContainer>
            <Flex>
              {/* {!account && <ConnectWalletButton mr="8px" />} */}
              {/* <Link to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </Link> */}
            </Flex>
          </Flex>
          <Flex
            height={['192px', null, null, '100%']}
            width={['192px', null, null, '100%']}
            flex={[null, null, null, '1']}
            mb={['24px', null, null, '0']}
            position="relative"
            justifyContent="center"
          >
            <BunnyWrapper>
              <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('squid pig')} />
            </BunnyWrapper>
            <StarsWrapper>
              <CompositeImage {...starsImage} />
            </StarsWrapper>
          </Flex>
        </Flex>
        <Snackbar
          open={alertState.open}
          autoHideDuration={6000}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          <Alert onClose={() => setAlertState({ ...alertState, open: false })} severity={alertState.severity}>
            {alertState.message}
          </Alert>
        </Snackbar>
      </PageSection>

      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #09070C 22%, #201335 100%)'
            : 'linear-gradient(180deg, #FFFFFF 22%, #D7CAEC 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
        <Flex justifyContent="center">
          <MintContainer>
            {!wallet ? (
              <Text textAlign="center" mt="24px" color="textSubtle">
                Connect wallet to mint.
              </Text>
            ) : (
              <MintButton disabled={isSoldOut || isMinting || !isActive} onClick={onMint} variant="contained">
                {isSoldOut ? (
                  <Text textAlign="center" color="textSubtle">
                    SOLD OUT
                  </Text>
                ) : isActive ? (
                  isMinting ? (
                    <CircularProgress />
                  ) : (
                    <Text textAlign="center">MINT</Text>
                  )
                ) : (
                  <Countdown
                    date={startDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  />
                )}
              </MintButton>
            )}
          </MintContainer>
        </Flex>
      </PageSection>
    </>
  )
}

interface AlertState {
  open: boolean
  message: string
  severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  )
}

export default Home
