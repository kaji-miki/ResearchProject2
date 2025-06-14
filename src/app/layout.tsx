import * as React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {props.children}
      </body>
    </html>
  );
}
