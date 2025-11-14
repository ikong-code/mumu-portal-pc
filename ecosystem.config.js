module.exports = {
  apps: [
    {
      name: 'mumu-pc',
      script: 'npx',
      args: 'serve dist -s -l 10103',
      cwd: '/ssd_1/clients/devapp1/mumu-pc',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      interpreter: '/home/devapp1/.nvm/versions/node/v18.20.4/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: 10103
      },
      time: true
    }
  ]
};
