import { Flex, HStack } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

export default function NavHolder() {

    let otherPages = "active-link"
    let currentPage = "inactive-link";

    return (
        <HStack alignItems="flex-start">
            <nav id="holder-nav">
                <Flex mt="1em" id="menu" className="holder-menu">
                    <NavLink to="keys" className={({isActive}) => isActive ? currentPage : otherPages}>Keys</NavLink>
                    <NavLink to="dids" className={({isActive}) => isActive ? currentPage : otherPages}>DIDs</NavLink>
                    <NavLink to="credentials" className={({isActive}) => isActive ? currentPage : otherPages}>Credentials</NavLink>
                </Flex>
            </nav>
            <Outlet/>
        </HStack>
    );

}