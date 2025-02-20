FROM node:20-alpine3.16

WORKDIR /app

COPY package.json .

# RUN npm install -g yarn

RUN yarn

COPY . .

EXPOSE 5173

CMD sh -c  "npm rebuild esbuild && [ -d "node_modules" ]  && yarn dev"
