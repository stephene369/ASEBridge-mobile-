/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APPWRITE_PROJECT_ID: string
    VITE_APPWRITE_URL: string
    VITE_APPWRITE_DATABASE_ID: string
    VITE_APPWRITE_STORAGE_ID: string
    VITE_APPWRITE_USER_COLLECTION_ID: string
    VITE_APPWRITE_POST_COLLECTION_ID: string
    VITE_APPWRITE_SAVES_COLLECTION_ID: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  