#!/usr/bin/env python
# encoding: utf-8

import multiprocessing

bind = "0.0.0.0:8000"
daemon = False
worker_class = "gevent"
workers = multiprocessing.cpu_count() * 2 + 1
accesslog = "/var/log/dpaste/access.log"
errorlog = "/var/log/dpaste/error.log"
