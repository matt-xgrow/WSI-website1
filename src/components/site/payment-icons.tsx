import React from 'react';

export const Visa = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 83" {...props}>
    <path fill="#1434CB" d="M111.4 81.3l17.4-80h27.4L130 81.3h-18.6zM69.6 81.3L49.1 22.5c-1.3-6.6-6.6-11-13-12.8L1 4.7v7.6l15.1 3.2c3.5 1 4.7 1.9 5.8 5.6l20.4 60.2h19.5l30.3-80h-19.4L69.6 81.3zM203 26.6c-17.5-4.4-18.8-9.4-18.8-13.4 0-4.6 5.5-9 15.3-9 8.6 0 14.5 1.8 19.3 3.8l3.1 1.4 3.3-20.1c-5.4-2.2-13.4-4.2-23.7-4.2-18.6 0-31.7 9.3-31.8 23.3-.1 10.3 9.4 16.1 16.6 19.6 7.4 3.6 9.9 5.9 9.9 9.2-.1 4.9-6.1 7.2-11.8 7.2-9.6 0-15.6-1.5-21-3.7l-2.9-1.3-3.4 20.9c5.2 2.3 15 4.5 25.4 4.6 20 .1 32.8-9.5 32.9-24.1.1-8.3-5-14.7-16.3-19.8M254.6 81.3h-15.3c-4.4 0-8-2.5-9.8-6.6l-28.5-68.5v-.2l-.1.2-16.7 80h18.6l3.7-10.4h22.7l2.2 10.4h15.9c-.1 0 7.3-34.9 7.3-34.9"/>
  </svg>
);

export const Mastercard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" {...props}>
    <circle fill="#EB001B" cx="30" cy="30" r="30" />
    <circle fill="#F79E1B" cx="70" cy="30" r="30" />
    <path fill="#FF5F00" d="M50 52.3c-9.1 0-16.8-5.3-20.7-13.1 3.9-7.8 11.6-13.1 20.7-13.1s16.8 5.3 20.7 13.1C66.8 47 59.1 52.3 50 52.3z" />
  </svg>
);

export const Amex = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 70" {...props}>
    <rect width="120" height="70" rx="6" fill="#016FD0" />
    <text x="60" y="32" fill="#fff" fontSize="20" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">AMERICAN</text>
    <text x="60" y="52" fill="#fff" fontSize="20" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">EXPRESS</text>
  </svg>
);

export const ApplePay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 40" {...props}>
    <path fill="#fff" d="M17.4 17.5c0-3.3 2.7-5.3 6.1-5.5-1.5-2.2-4.1-3.2-6.5-3.3-2.7-.2-5.4 1.5-6.8 1.5-1.5 0-3.7-1.5-5.9-1.4-2.8 0-5.4 1.6-6.9 4.1-3 5.1-.8 12.6 2.1 16.8 1.4 2 3.1 4.3 5.3 4.2 2.1-.1 2.9-1.4 5.4-1.4 2.5 0 3.2 1.4 5.4 1.4 2.3 0 3.7-2.1 5.1-4.1 1.7-2.4 2.4-4.8 2.4-4.9-1.9-1-5.7-2.8-5.7-7.4M20.2 6.6c1.1-1.4 1.9-3.3 1.7-5.2-1.7.1-3.7 1.1-4.9 2.5-1 1.2-1.9 3.2-1.7 5.1 1.9.2 3.8-1 4.9-2.4"/>
    <text x="32" y="27" fill="#fff" fontSize="22" fontWeight="600" fontFamily="-apple-system, sans-serif" letterSpacing="-0.5">Pay</text>
  </svg>
);

export const GooglePay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 40" {...props}>
    {/* Google G Logo */}
    <path fill="#4285F4" d="M22.8 16.5H12v4.8h6.2c-.3 1.9-1.4 3.5-3.1 4.6v3.8h5c2.9-2.7 4.6-6.6 4.6-11 0-.8-.1-1.5-.2-2.2z" />
    <path fill="#34A853" d="M12 27.5c3 0 5.6-1 7.4-2.7l-5-3.8c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.1-4.5H-.4v3.9c1.9 3.7 5.6 6 9.8 6z" />
    <path fill="#FBBC05" d="M5.9 17.6c-.2-.7-.3-1.4-.3-2.1 0-.7.1-1.4.3-2.1V9.5H-.4A11.9 11.9 0 00-2 15.5c0 2 .5 3.9 1.4 5.6l4.5-3.5z" />
    <path fill="#EA4335" d="M12 8.5c1.6 0 3.1.6 4.3 1.7l3.2-3.2C17.6 5.3 15 4 12 4 7.8 4 4.1 6.3 2.2 10l4.5 3.5c.8-2.6 3.2-4.5 6.1-4.5z" />
    {/* Pay Text */}
    <text x="26" y="23" fill="#fff" fontSize="18" fontWeight="500" fontFamily="sans-serif">Pay</text>
  </svg>
);

export const Afterpay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 40" {...props}>
    <path fill="#B2FCE4" d="M22.5 12.5L15 20l7.5 7.5L25 25l-5-5 5-5-2.5-2.5zM12.5 12.5l-2.5 2.5 5 5-5 5 2.5 2.5L20 20l-7.5-7.5z"/>
    <text x="32" y="24" fill="#B2FCE4" fontSize="16" fontWeight="bold" fontFamily="sans-serif">afterpay</text>
  </svg>
);
