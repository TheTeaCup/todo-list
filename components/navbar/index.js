import React from 'react';
import {
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    Icon,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {FiCompass, FiHome, FiStar,} from 'react-icons/fi';
import MobileNav from "@/components/navbar/mobile";
import {useRouter} from "next/router";
import NextLink from "next/link";

const LinkItems = [
    {name: 'Home', icon: FiHome, href: '/app'},
    {name: 'Create', icon: FiCompass, href: '/app/create'},
    {name: 'Favorites', icon: FiStar, href: '/app/favorites'},
];

export default function Navbar({
                                   user,
                                   children,
                               }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav user={user} onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({onClose, ...rest}) => {
    const router = useRouter()
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    ToDo
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem href={link.href} key={link.name} icon={link.icon} isActive={router.asPath === link.href}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({href, icon, isActive, children, outbound, ...rest}) => {
    const text = useColorModeValue('dark', 'light')
    const background = useColorModeValue('gray.200', 'gray.700');

    return (
        <Link as={NextLink} href={href} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}
              target={outbound ? '_blank' : '_self'}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                marginBottom={'2'}
                bg={isActive ? background : undefined}
                _hover={{
                    bg: useColorModeValue('gray.200', 'gray.800'),
                    color: useColorModeValue('black', 'white'),
                    cursor: 'pointer',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: text,
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};
