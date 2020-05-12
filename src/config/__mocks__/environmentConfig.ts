const EnvironmentConfig = {
    ...jest.requireActual('../environmentConfig.ts'),
    isMocking: true,
};

export default EnvironmentConfig;
