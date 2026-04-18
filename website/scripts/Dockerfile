FROM python:3.12-alpine

WORKDIR /app

RUN pip install --no-cache-dir requests

COPY blog-topics-1000.json /app/blog-topics-1000.json
COPY publish-blogs.py /app/publish-blogs.py
COPY send-digest.py /app/send-digest.py
COPY syndicate-blogs.py /app/syndicate-blogs.py

RUN chmod +x /app/publish-blogs.py /app/send-digest.py /app/syndicate-blogs.py

CMD ["python3", "/app/publish-blogs.py"]
