
import localFont from 'next/font/local';

export const estedadFont = localFont({
    src: [
        {
            path: '../assets/fonts/Estedad-FD-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-Regular.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-Thin.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../assets/fonts/Estedad-FD-ExtraLight.woff2',
            weight: '100',
            style: 'normal',
        },
    ],
    variable: '--font-estedad',
    style: 'normal',
    display: 'swap',
})