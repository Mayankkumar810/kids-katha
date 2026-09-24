import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Public Layout & Pages
import { PublicLayout } from './components/common/PublicLayout';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { CategoriesPage, CategoryDetailPage } from './pages/CategoriesPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Layout & Pages
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { Dashboard } from './admin/Dashboard';
import { AddStory } from './admin/AddStory';
import { ManageStories } from './admin/ManageStories';
import { CategoryManagement } from './admin/CategoryManagement';
import { PolicySettings } from './admin/PolicySettings';
import { SocialMediaSettings } from './admin/SocialMediaSettings';
import { HomepageSettings } from './admin/HomepageSettings';
import { AdsSettings } from './admin/AdsSettings';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes with Navbar, Breadcrumbs & Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/story/:slug" element={<StoryDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:slug" element={<CategoryDetailPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
                <Route path="/terms" element={<LegalPage type="terms" />} />
                <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
              </Route>

              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="add-story" element={<AddStory />} />
                <Route path="stories" element={<ManageStories />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="policies" element={<PolicySettings />} />
                <Route path="social" element={<SocialMediaSettings />} />
                <Route path="homepage" element={<HomepageSettings />} />
                <Route path="ads" element={<AdsSettings />} />
              </Route>

              {/* Catch-all 404 Route */}
              <Route element={<PublicLayout />}>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
