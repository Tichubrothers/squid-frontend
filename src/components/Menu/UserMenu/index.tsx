import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  Flex,
  Text,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
} from '@pancakeswap/uikit'
import styled from 'styled-components'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import history from 'routerHistory'
import useAuth from 'hooks/useAuth'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'
import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from '../../../views/HomeA/candy-machine'

const UserMenu = () => {
  const ConnectButton = styled(WalletDialogButton)``
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  // if (!account) {
  //   return <ConnectWalletButton scale="sm" />
  // }

  const wallet = useAnchorWallet()

  return (
    <>
      {!wallet ? (
        <ConnectButton>Connect Wallet</ConnectButton>
      ) : (
        <Text color="textSubtle">Address: {shortenAddress(wallet.publicKey.toBase58() || '')}</Text>
      )}
    </>
    // <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
    //   <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
    //   <UserMenuItem as="button" onClick={onPresentTransactionModal}>
    //     {t('Transactions')}
    //   </UserMenuItem>
    //   <UserMenuDivider />
    //   <UserMenuItem as="button" onClick={() => history.push(`${nftsBaseUrl}/profile/${account.toLowerCase()}`)}>
    //     {t('Your NFTs')}
    //   </UserMenuItem>
    //   <ProfileUserMenuItem isLoading={isLoading} hasProfile={hasProfile} />
    //   <UserMenuDivider />
    //   <UserMenuItem as="button" onClick={logout}>
    //     <Flex alignItems="center" justifyContent="space-between" width="100%">
    //       {t('Disconnect')}
    //       <LogoutIcon />
    //     </Flex>
    //   </UserMenuItem>
    // </UIKitUserMenu>
  )
}

export default UserMenu
