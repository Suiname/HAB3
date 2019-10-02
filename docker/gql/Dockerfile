# base image
FROM node

# set working directory
WORKDIR /gql
# add `/app/node_modules/.bin` to $PATH
ENV PATH /gql/node_modules/.bin:$PATH
COPY ./gql/package.json .

# install and cache app dependencies
RUN npm install --silent

COPY ./gql .


# start app
CMD ["npm", "start"]