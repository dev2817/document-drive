'use client'
import store, { persistor } from '@/store/store'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
            />
        </div>
    )
}
