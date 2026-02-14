import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Login from './Login';
import SignUp from './SignUp';

export default function LoginRegister() {
  return (
    <Tabs
      variant="outlined"
      aria-label="Welcome to Cocoder"
      defaultValue={0}
      sx={{
        width: 343,
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
      }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Login
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          SignUp
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <Login></Login>
      </TabPanel>
      <TabPanel value={1}>
        <SignUp></SignUp>
      </TabPanel>
    </Tabs>
  );
}