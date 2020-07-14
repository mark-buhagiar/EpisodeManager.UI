const EnvironmentConfig = {
    isMocking: false,
    isAuthenticated: true,
    loading: false, // Only used when isAuthed is set to false
    permissions: ['read:admin', 'execute:admin'],
};

export default EnvironmentConfig;
