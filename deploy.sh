# 1. 在本地打包
tar --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    -czf mumu-pc-update.tar.gz .

# 2. 上传到服务器
scp -P 6007 mumu-pc-update.tar.gz devapp1@47.99.151.88:/ssd_1/clients/devapp1/

# 3. 在服务器上更新
ssh -p 6007 devapp1@47.99.151.88 << 'EOF'
cd /ssd_1/clients/devapp1/mumu-pc
pm2 stop mumu-pc
tar -xzf ../mumu-pc-update.tar.gz
pnpm install
pm2 start ecosystem.config.js
pm2 save
echo "部署完成，应用运行在 localhost:10103"
EOF