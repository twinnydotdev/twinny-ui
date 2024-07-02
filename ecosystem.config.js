module.exports = {
  apps : [{
    name: 'twinny',
    script: './build/index.js',
    watch: false,
    autorestart: true,
    env: {
        PORT: 3003,
        ENV_PATH: ".env",
    }
  }]
}
