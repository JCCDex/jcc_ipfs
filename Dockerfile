FROM registry.cn-qingdao.aliyuncs.com/jccoin/jc_sails:1.2.4

CMD ["sails", "lift","--prod"]
WORKDIR /app
COPY ./package.json /app/package.json
RUN  npm install > /dev/null 2>&1
COPY . /app