import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa';
import { Component } from "react";

class MyBreadcrumb extends Component {
    
    render() {
        return <Breadcrumb spacing='8px' separator={<FaAngleRight color='gray.500' />}>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    }
}

export default MyBreadcrumb;