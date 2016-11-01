FROM python:3

RUN apt-get update
RUN apt-get install -y nginx-full supervisor npm node

RUN rm -rf /usr/sbin/node && ln -s /usr/bin/nodejs /usr/sbin/node
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN mkdir -p /var/www/tehusu
RUN mkdir /logs && chmod 755 /logs

COPY requirements.txt /var/www/tehusu/requirements.txt
COPY nginx /var/www/tehusu/nginx
COPY supervisor.conf /etc/supervisor/conf.d/supervisord.conf
COPY be /var/www/tehusu/be
COPY fe /var/www/tehusu/fe
COPY ws /var/www/tehusu/ws

RUN chmod 755 /var/www/tehusu/be/djserver.sh

ENV NGINX=/etc/nginx
ENV NGINX_SITES_ENABLED=/etc/nginx/sites-enabled
ENV NGINX_SITES_AVAILABLE=/etc/nginx/sites-available
ENV TEHUSU=/var/www/tehusu

RUN pip install -r $TEHUSU/requirements.txt

RUN cd /var/www/tehusu/fe; npm install

RUN rm $NGINX_SITES_ENABLED/default
RUN ln -s $TEHUSU/nginx $NGINX_SITES_ENABLED


VOLUME /var/www/tehusu
EXPOSE 80

CMD ln -s /proc/self/fd /dev/fd; /usr/bin/supervisord -n