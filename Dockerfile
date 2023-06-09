FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_DOVES_API_URL

ENV REACT_APP_TITLE="DoVEs Admin Panel"
ENV REACT_APP_DESCRIPTION=""
ENV REACT_APP_DOVES_API_URL=$REACT_APP_DOVES_API_URL

RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]