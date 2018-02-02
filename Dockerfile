FROM node:6.11.4-alpine
ADD . /server/www/
WORKDIR /server/www/
RUN cd /server/www && npm install
EXPOSE 3002
CMD ["node","index.js"]
