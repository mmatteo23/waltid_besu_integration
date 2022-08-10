import { Box } from '@chakra-ui/react';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

export function TabBox (props: { 
    children: 
        | string
        | number 
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>> 
        | ReactFragment 
        | ReactPortal 
        | null 
        | undefined; 
}) {
    return (
        <Box w='75%' m='auto' mt='2em'>
            {props.children}
        </Box>
    );
}