FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview", "--", "--host", "--port", "80"]