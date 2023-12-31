import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'wagmi'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { APP_NAME, PAGE_NAME } from '@/config'

export default function Layout({ children }: any) {
  const router = useRouter()
  const { address } = useAccount()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const goto = (path: string) => {
    router.push(path)
    setOpen(!open)
  }

  const handleTranslate = (locale: string) => {
    router.push(router.route, router.asPath, { locale })
    setAnchorEl(null)
  }

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          {address && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <Box sx={{ mr: 1 }}>
            <ConnectButton accountStatus="address" />
          </Box>
          <IconButton
            id="translate-button"
            onClick={handleClick}
            sx={{ color: 'white' }}
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            id="translate-menu"
            anchorEl={anchorEl}
            open={menu}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleTranslate('en')}>English</MenuItem>
            <MenuItem onClick={() => handleTranslate('ja')}>日本語</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>{PAGE_NAME.HOME}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goto('/collection')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText>{PAGE_NAME.COLLECTION.INDEX}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <main>{children}</main>
    </>
  )
}
