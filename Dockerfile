FROM node:22.14-slim

WORKDIR /var/app/
COPY . /var/app/

RUN ["npm", "install"]

EXPOSE 4001
CMD ["npx", "ts-node", "app.ts"]