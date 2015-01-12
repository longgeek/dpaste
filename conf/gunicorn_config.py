#!/usr/bin/env python
# encoding: utf-8

import multiprocessing

bind = "127.0.0.1:9005"
daemon = False
worker_class = "gevent"
workers = multiprocessing.cpu_count() * 2 + 1
accesslog = "/var/log/paste/access.log"
errorlog = "/var/log/paste/error.log"
