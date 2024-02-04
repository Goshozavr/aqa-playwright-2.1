FROM mcr.microsoft.com/playwright:v1.41.2-jammy

RUN mkdir playwright-tests

COPY . /playwright-tests

WORKDIR /playwright-tests

VOLUME playwright-report/ playwright-report/

RUN npm ci

CMD ["npm", "test"]