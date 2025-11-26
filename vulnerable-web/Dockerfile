FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN chmod +x ./init_db.sh && ./init_db.sh
EXPOSE 3000
CMD ["node", "app.js"]
