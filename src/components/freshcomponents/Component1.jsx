import React from 'react'
import Freshlandingpage from './Freshlandingpage'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

const Component1 = () => {
    return (
        <>
            <QueryClientProvider client={queryClient} >
                <Freshlandingpage />
            </QueryClientProvider>
        </>
    )
}

export default Component1
