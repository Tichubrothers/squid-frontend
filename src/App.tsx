import React, { lazy, useMemo } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import { nftsBaseUrl } from 'views/Nft/market/constants'

// import HomeA from './views/HomeA'
import './App.css'
import * as anchor from '@project-serum/anchor'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets'

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { createTheme, ThemeProvider } from '@material-ui/core'

import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Home = lazy(() => import('./views/Home'))

const HomeA = lazy(() => import('./views/HomeA'))
const Farms = lazy(() => import('./views/Farms'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
const Voting = lazy(() => import('./views/Voting'))
const Proposal = lazy(() => import('./views/Voting/Proposal'))
const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Info = lazy(() => import('./views/Info'))
const NftMarket = lazy(() => import('./views/Nft/market'))
const ProfileCreation = lazy(() => import('./views/ProfileCreation'))
const PancakeSquad = lazy(() => import('./views/PancakeSquad'))

const treasury = new anchor.web3.PublicKey(process.env.REACT_APP_TREASURY_ADDRESS!)

const config = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_CONFIG!)

const candyMachineId = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!)

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!
const connection = new anchor.web3.Connection(rpcHost)

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10)

const txTimeout = 30000 // milliseconds (confirm this works for your project)

const theme = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
})

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), [])

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  )

  // const { account } = useWeb3React()

  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <Router history={history}>
            <ResetCSS />
            <GlobalStyle />
            <GlobalCheckClaimStatus excludeLocations={[]} />
            <Menu>
              <SuspenseWithChunkError fallback={<PageLoader />}>
                <Switch>
                  <Route path="/" exact>
                    {/* <Home /> */}
                    <HomeA
                      candyMachineId={candyMachineId}
                      config={config}
                      connection={connection}
                      startDate={startDateSeed}
                      treasury={treasury}
                      txTimeout={txTimeout}
                    />
                  </Route>
                  <Route exact path="/farms/auction">
                    <FarmAuction />
                  </Route>
                  <Route path="/farms">
                    <Farms />
                  </Route>
                  <Route path="/pools">
                    <Pools />
                  </Route>
                  <Route path="/lottery">
                    <Lottery />
                  </Route>
                  <Route path="/ifo">
                    <Ifos />
                  </Route>
                  <Route exact path="/teams">
                    <Teams />
                  </Route>
                  <Route path="/teams/:id">
                    <Team />
                  </Route>
                  <Route path="/create-profile">
                    <ProfileCreation />
                  </Route>
                  <Route path="/competition">
                    <TradingCompetition />
                  </Route>
                  <Route exact path="/prediction">
                    <Predictions />
                  </Route>
                  <Route path="/prediction/leaderboard">
                    <PredictionsLeaderboard />
                  </Route>
                  <Route exact path="/voting">
                    <Voting />
                  </Route>
                  <Route exact path="/voting/proposal/create">
                    <CreateProposal />
                  </Route>
                  <Route path="/voting/proposal/:id">
                    <Proposal />
                  </Route>

                  {/* NFT */}
                  <Route path="/nfts">
                    <NftMarket />
                  </Route>

                  <Route path="/pancake-squad">
                    <PancakeSquad />
                  </Route>

                  {/* Info pages */}
                  <Route path="/info">
                    <Info />
                  </Route>

                  {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/liquidity" component={Liquidity} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact path="/create" component={AddLiquidity} />
                  <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                  {/* Redirect */}
                  <Route path="/pool">
                    <Redirect to="/liquidity" />
                  </Route>
                  <Route path="/staking">
                    <Redirect to="/pools" />
                  </Route>
                  <Route path="/syrup">
                    <Redirect to="/pools" />
                  </Route>
                  <Route path="/collectibles">
                    <Redirect to="/nfts" />
                  </Route>
                  <Route path="/profile">
                    {/* <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} /> */}
                  </Route>

                  {/* 404 */}
                  <Route component={NotFound} />
                </Switch>
              </SuspenseWithChunkError>
            </Menu>
            <EasterEgg iterations={2} />
            <ToastListener />
            <DatePickerPortal />
          </Router>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default React.memo(App)
