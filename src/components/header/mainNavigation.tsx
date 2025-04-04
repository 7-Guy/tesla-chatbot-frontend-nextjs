'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const navItems = [
    {label: 'Chat', href: '/', id: 'tab-chat'},
    {label: 'History', href: '/history', id: 'tab-history'},
    {label: 'AI Models', href: '/ai-models', id: 'tab-ai-models'},
    {label: 'Prompt Management', href: '/prompt-management', id: 'tab-prompt-management'},
];

export default function MainNavigation() {
    const pathname = usePathname();
    const [value, setValue] = React.useState(pathname);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        setValue(pathname);
    }, [pathname]);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1
            }}
        >
            {isSmallScreen ? (
                <>
                    <IconButton
                        aria-label="navigation menu"
                        onClick={handleMenuClick}
                        color="primary"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        {navItems.map((item) => (
                            <MenuItem
                                key={item.href}
                                onClick={handleMenuClose}
                                selected={value === item.href}
                                component={Link}
                                href={item.href}
                                sx={{color: 'primary.main'}}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                <Tabs
                    className="main-navigation"
                    value={value}
                    onChange={handleChange}
                    aria-label="navigation tabs"
                    role="navigation"
                >
                    {navItems.map((item) => (
                        <Tab
                            key={item.href}
                            id={item.id}
                            label={item.label}
                            component={Link}
                            href={item.href}
                            value={item.href}
                        />
                    ))}
                </Tabs>
            )}
        </Box>
    );
}
