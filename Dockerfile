FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --registry=https://registry.npm.taobao.org
RUN npm install --global gatsby-cli --registry=https://registry.npm.taobao.org

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "gatsby", "develop", "-H", "0.0.0.0"]
