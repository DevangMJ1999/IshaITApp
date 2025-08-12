import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Commit {
  id: string
  message: string
  timestamp: string
  hash: string
  icon: 'branch' | 'plus' | 'edit' | 'save'
}

interface VersionState {
  version: string
  commits: number
  branch: string
  recentCommits: Commit[]
  counter: number
  settings: {
    repoUrl: string
    defaultBranch: string
    autoIncrement: boolean
    showHistory: boolean
  }
  
  // Actions
  incrementVersion: () => void
  addCommit: (message: string, icon?: 'branch' | 'plus' | 'edit' | 'save') => void
  incrementCounter: () => void
  decrementCounter: () => void
  resetCounter: () => void
  updateSettings: (settings: Partial<VersionState['settings']>) => void
}

export const useVersionStore = create<VersionState>()(
  persist(
    (set, get) => ({
      version: 'v1.3.0',
      commits: 45,
      branch: 'main',
      counter: 0,
      recentCommits: [
        {
          id: '1',
          message: 'Updated version to v1.3.0 for Git testing',
          timestamp: 'just now',
          hash: 'f9e8d7c',
          icon: 'save'
        },
        {
          id: 'nav-component',
          message: 'Add new navigation component',
          timestamp: '2 hours ago',
          hash: 'a1b2c3d',
          icon: 'branch'
        },
        {
          id: 'style-update',
          message: 'Update version display styling',
          timestamp: '5 hours ago',
          hash: 'x9y8z7w',
          icon: 'plus'
        },
        {
          id: 'layout-fix',
          message: 'Fix responsive layout issues',
          timestamp: '1 day ago',
          hash: 'm5n4o3p',
          icon: 'edit'
        }
      ],
      settings: {
        repoUrl: 'https://github.com/username/repo',
        defaultBranch: 'main',
        autoIncrement: true,
        showHistory: true
      },

      incrementVersion: () => set((state: VersionState) => {
        const versionParts = state.version.replace('v', '').split('.');
        const patch = parseInt(versionParts[2]) + 1;
        const newVersion = `v${versionParts[0]}.${versionParts[1]}.${patch}`;
        
        return {
          version: newVersion,
          commits: state.commits + 1
        };
      }),

      addCommit: (message: string, icon: 'branch' | 'plus' | 'edit' | 'save' = 'save') => set((state: VersionState) => {
        const newCommit: Commit = {
          id: Date.now().toString(),
          message,
          timestamp: 'just now',
          hash: Math.random().toString(36).substring(2, 9),
          icon
        };

        return {
          recentCommits: [newCommit, ...state.recentCommits].slice(0, 5),
          commits: state.commits + 1
        };
      }),

      incrementCounter: () => set((state: VersionState) => ({ counter: state.counter + 1 })),
      decrementCounter: () => set((state: VersionState) => ({ counter: state.counter - 1 })),
      resetCounter: () => set({ counter: 0 }),

      updateSettings: (newSettings: Partial<VersionState['settings']>) => set((state: VersionState) => ({
        settings: { ...state.settings, ...newSettings }
      }))
    }),
    {
      name: 'version-store'
    }
  )
)
