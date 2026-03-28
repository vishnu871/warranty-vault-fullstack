// import { RouterProvider } from 'react-router';
// import { router } from './routes';
// import { AuthProvider } from './contexts/AuthContext';


// export default function App() {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// }

import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner'; // 1. Import the Toaster

export default function App() {
  return (
    <AuthProvider>
      {/* 2. Add the Toaster here */}
      <Toaster 
        position="top-right" 
        richColors 
        theme="dark" 
        closeButton
        toastOptions={{
          style: {
            background: 'rgba(26, 26, 26, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.25rem',
            color: '#fff',
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
