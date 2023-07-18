FROM node as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY --from=build /app/dist src
COPY package*.json .
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "src/index.js"]