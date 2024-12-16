FROM node:16-alpine


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn install


COPY server ./server


COPY types ./types


EXPOSE 2678


CMD ["yarn", "start"]
