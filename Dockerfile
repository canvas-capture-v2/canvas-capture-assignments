FROM node:22.14-slim

WORKDIR /app
COPY . .

RUN ["npm", "install"]
EXPOSE 4001
RUN ["npm", "run", "build"]

CMD ["npm", "start"]