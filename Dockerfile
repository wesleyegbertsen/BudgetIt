# Build the BudgetIt Sapper app
FROM node:12-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Install dependencies
FROM node:12-alpine AS dependencies

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci --prod

COPY static static
COPY __sapper__ __sapper__

# Copy node_modules/ and other build files over
FROM node:12-alpine

WORKDIR /app

COPY --from=dependencies /app .

EXPOSE 3000
CMD ["node", "__sapper__/build"]

# Build instructions
# $ docker build . -t budgetit

# Run instructions
# $ docker run -p 3000:3000 budgetit