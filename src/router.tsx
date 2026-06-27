import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/components/layout/RootLayout'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

// Code-split the heavier routes: LessonPage pulls in Recharts + MDX content, so keep it out
// of the initial bundle. The catalog (Home) stays eager for a fast first paint.
const LessonPage = lazy(() =>
  import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })),
)
const Explore = lazy(() => import('@/pages/Explore').then((m) => ({ default: m.Explore })))
const Sky = lazy(() => import('@/pages/Sky').then((m) => ({ default: m.Sky })))
const Launches = lazy(() => import('@/pages/Launches').then((m) => ({ default: m.Launches })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lessons/:slug', element: <LessonPage /> },
      { path: 'explore', element: <Explore /> },
      { path: 'sky', element: <Sky /> },
      { path: 'launches', element: <Launches /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
