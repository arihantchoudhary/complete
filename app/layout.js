export const metadata = {
  title: 'AI Chat App',
  description: 'Chat with AI models like GPT-4 and Claude',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 