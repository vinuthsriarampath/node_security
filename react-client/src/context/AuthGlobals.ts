// This file holds the global function declarations for non-React access to auth state.
// Separated from AuthContext.tsx to comply with ESLint's react-refresh/only-export-components rule,
// which requires files to export only React components for proper fast refresh in development.

export const authGlobals = {
    getAccessToken: (): string | null => null,
    setAccessToken: ( token: string | null): void => { void token; },
};