import { Provider } from '../components/Provider/Provider';
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Provider>
          <div className='container'>
           {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
