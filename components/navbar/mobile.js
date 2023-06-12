import {
    Box,
    Flex,
    HStack,
    IconButton, Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import ThemeSwitcher from "@/components/themeSwitcher";
import NextLink from "next/link";

export default function MobileNav({user, onOpen, ...rest}) {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <ThemeSwitcher/>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{user?.username || 'Loading'}</Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <MenuItemLink href={'/app'}>Profile</MenuItemLink>
                            <MenuItemLink href={'/app/settings'}>Settings</MenuItemLink>
                            <MenuDivider/>
                            <MenuItemLink href={'/app/logout'}>Sign out</MenuItemLink>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const MenuItemLink = ({href, icon, children}) => {
    return (
        <Link as={NextLink} href={href} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <MenuItem>{children}</MenuItem>
        </Link>
    );
};